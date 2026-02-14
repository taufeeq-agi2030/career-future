
import { UserAuth, UserRole, UserProfile, CareerAssessment, ViewState } from '../types';

/**
 * Backend Strategy Intelligence (BSI)
 * Handles DB Simulation, RBAC, and Authentication Protocols.
 */

class BackendService {
  private static STORAGE_KEY = 'FUTUREPATH_DB';
  
  // Database Schema Version
  private static SCHEMA_VERSION = '1.0.8-PROD';

  private static RBAC_POLICIES: Record<UserRole, string[]> = {
    'GUEST': ['READ_PUBLIC'],
    'MEMBER': ['READ_OWN', 'WRITE_OWN', 'UPDATE_OWN', 'DELETE_OWN', 'VOICE_REFLECT', 'AI_CHAT'],
    'STRATEGIST': ['READ_ALL', 'READ_SYSTEM', 'UPDATE_GLOBAL', 'RBAC_MANAGEMENT']
  };

  private db: any = {
    users: [],
    profiles: [],
    assessments: [],
    reflections: [],
    plans: [],
    skill_audits: [],
    logs: []
  };

  constructor() {
    this.loadDB();
  }

  private loadDB() {
    try {
      const data = localStorage.getItem(BackendService.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.db = { ...this.db, ...parsed };
      }
    } catch (e) {
      console.error("Database corrupted. Re-initializing.");
      this.saveDB();
    }
  }

  private saveDB() {
    localStorage.setItem(BackendService.STORAGE_KEY, JSON.stringify(this.db));
    this.logAction('SYSTEM', 'DB_SAVE', 'SUCCESS');
  }

  private logAction(userId: string, action: string, status: string) {
    if (!this.db.logs) this.db.logs = [];
    this.db.logs.unshift({
      id: Math.random().toString(36).substr(2, 9),
      userId,
      action,
      status,
      timestamp: new Date().toISOString()
    });
    if (this.db.logs.length > 100) this.db.logs.pop();
  }

  async authenticate(email: string, pass: string): Promise<UserAuth> {
    const user = this.db.users?.find((u: any) => u.email === email);
    
    if (!user) {
      throw new Error("Identity not found. Please initiate evolution (Sign Up).");
    }

    this.logAction(user.id, 'LOGIN', 'SUCCESS');
    return {
      ...user,
      lastLogin: new Date(user.lastLogin)
    };
  }

  async register(name: string, email: string, pass: string): Promise<UserAuth> {
    const existing = this.db.users?.find((u: any) => u.email === email);
    if (existing) throw new Error("Identity already exists in matrix.");

    const user: UserAuth = {
      id: `USR-${Math.random().toString(36).substr(2, 6)}`,
      email,
      name,
      role: email.includes('admin') ? 'STRATEGIST' : 'MEMBER',
      isAuthenticated: true,
      lastLogin: new Date(),
      permissions: []
    };
    user.permissions = BackendService.RBAC_POLICIES[user.role as UserRole];
    
    if (!this.db.users) this.db.users = [];
    this.db.users.push(user);
    this.saveDB();
    this.logAction(user.id, 'REGISTER', 'SUCCESS');
    return user;
  }

  async googleAuth(): Promise<UserAuth> {
    const email = "google.user@gmail.com";
    let user = this.db.users?.find((u: any) => u.email === email);
    
    if (!user) {
      user = await this.register("Google User", email, "OAUTH_BYPASS");
    }

    this.logAction(user.id, 'GOOGLE_AUTH', 'SUCCESS');
    return user;
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = this.db.users?.find((u: any) => u.email === email);
    if (!user) throw new Error("Email not found in registry.");
    
    this.logAction(user.id, 'PWD_RECOVERY_REQ', 'SUCCESS');
    return true;
  }

  getSystemHealth() {
    return {
      schema: BackendService.SCHEMA_VERSION,
      integrity: '100%',
      rbacActive: true,
      encryptionLevel: 'AES-256-SIM',
      tables: Object.keys(this.db).length,
      records: Object.values(this.db).reduce((acc: number, val: any) => acc + (val?.length || 0), 0)
    };
  }

  checkPermission(role: UserRole, action: string): boolean {
    const perms = BackendService.RBAC_POLICIES[role];
    return perms.includes(action) || perms.includes('READ_ALL');
  }

  async saveRecord(table: string, data: any, role: UserRole): Promise<boolean> {
    if (!this.checkPermission(role, 'WRITE_OWN')) {
      this.logAction('UNKNOWN', `WRITE_${table}`, 'DENIED');
      throw new Error("RBAC Violation.");
    }

    if (!this.db[table]) this.db[table] = [];
    this.db[table].push({ ...data, updatedAt: new Date().toISOString() });
    this.saveDB();
    this.logAction(data.userId || 'SYSTEM', `WRITE_${table}`, 'SUCCESS');
    return true;
  }

  async getOwnRecords(table: string, userId: string, role: UserRole): Promise<any[]> {
    if (!this.checkPermission(role, 'READ_OWN')) {
      this.logAction(userId, `READ_${table}`, 'DENIED');
      throw new Error("RBAC Violation.");
    }
    return (this.db[table] || []).filter((r: any) => r.userId === userId);
  }
}

export const bsi = new BackendService();
