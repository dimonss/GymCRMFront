// User and Authentication Types
export type UserRole = 'guest' | 'club_admin' | 'super_admin';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    clubId?: string; // For club_admin role
}

// Sports Club Types
export type SportType = 'fitness' | 'boxing' | 'yoga' | 'swimming' | 'martial_arts' | 'crossfit' | 'tennis' | 'basketball';
export type ClubStatus = 'active' | 'inactive' | 'pending';

export interface SportsClub {
    id: string;
    name: string;
    description: string;
    location: {
        city: string;
        address: string;
    };
    sportTypes: SportType[];
    membersCount: number;
    status: ClubStatus;
    contactInfo: {
        phone: string;
        email: string;
        website?: string;
    };
    joinedDate: string;
    logo?: string;
}

// Application Form Types
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface ClubApplication {
    id: string;
    clubName: string;
    contactPerson: {
        name: string;
        email: string;
        phone: string;
    };
    location: {
        city: string;
        address: string;
    };
    sportTypes: SportType[];
    membersCount: number;
    description: string;
    status: ApplicationStatus;
    submittedDate: string;
    reviewedDate?: string;
    reviewedBy?: string;
    rejectionReason?: string;
}

// CRM Dashboard Types
export interface ClubMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    membershipType: 'basic' | 'premium' | 'vip';
    joinDate: string;
    expiryDate: string;
    status: 'active' | 'expired' | 'suspended';
}

export interface TrainingSession {
    id: string;
    title: string;
    trainer: string;
    sportType: SportType;
    date: string;
    time: string;
    duration: number; // in minutes
    capacity: number;
    enrolled: number;
}

export interface ClubStats {
    totalMembers: number;
    activeMembers: number;
    revenue: number;
    upcomingSessions: number;
    membershipGrowth: number; // percentage
}
