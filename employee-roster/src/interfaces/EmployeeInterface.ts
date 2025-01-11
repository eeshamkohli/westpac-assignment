export interface Employee {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    contactNo: string;
    address: string;
    age: number;
    bio: string;
    dateJoined: string;
  }

export interface Company {
    companyInfo: {
        companyName: string;
        companyMotto: string;
        companyEst: string;
    };
    employees: Employee[];
}