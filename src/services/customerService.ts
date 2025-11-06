// Customer Service - Mock API for customer registration and management
import { RegisterPayload, User } from '../types/auth';

// Mock API response interface
interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

// Simulate network delay
const simulateDelay = (min: number = 500, max: number = 1200): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Mock customer registration endpoint
export const registerCustomer = async (payload: RegisterPayload): Promise<ApiResponse<User>> => {
  await simulateDelay();
  
  try {
    // Simulate API call to /api/customers/register
    console.log("🌐 [CustomerService] Mock API call to /api/customers/register", payload);
    
    // Generate new customer ID
    const customerId = `CUS-${Date.now()}`;
    const username = payload.email.split('@')[0];
    
    // Create new customer object
    const newCustomer: User = {
      id: customerId,
      name: payload.fullName,
      username: username,
      email: payload.email,
      phone: payload.phone,
      role: 'customer',
      orderCount: 0,
      createdAt: Date.now()
    };
    
    // Simulate successful registration
    console.log("✅ [CustomerService] Customer registered successfully:", newCustomer);
    
    return {
      ok: true,
      data: newCustomer,
      message: "Registration successful"
    };
  } catch (error) {
    console.error("❌ [CustomerService] Registration error:", error);
    return {
      ok: false,
      message: "Registration failed"
    };
  }
};

// Mock customer login endpoint (for future use)
export const loginCustomer = async (email: string, password: string): Promise<ApiResponse<User>> => {
  await simulateDelay();
  
  // This would typically validate credentials against a database
  // For now, just simulate a successful login
  return {
    ok: true,
    data: {
      id: "CUS-123456",
      name: "Test Customer",
      username: "testuser",
      email: email,
      phone: "0901234567",
      role: "customer",
      orderCount: 0,
      createdAt: Date.now()
    }
  };
};

// Mock customer profile update
export const updateCustomerProfile = async (customerId: string, updates: Partial<User>): Promise<ApiResponse<User>> => {
  await simulateDelay();
  
  // Simulate profile update
  return {
    ok: true,
    data: {
      id: customerId,
      name: updates.name || "Updated Customer",
      username: updates.username || "updateduser",
      email: updates.email || "updated@example.com",
      phone: updates.phone || "0901234567",
      role: "customer",
      orderCount: 0,
      createdAt: Date.now()
    }
  };
};

// Mock customer deletion
export const deleteCustomer = async (customerId: string): Promise<ApiResponse<boolean>> => {
  await simulateDelay();
  
  // Simulate customer deletion
  return {
    ok: true,
    data: true,
    message: "Customer deleted successfully"
  };
};
