import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../AuthContext";
import { formatVND } from "../utils/currency";
import styled from "styled-components";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Styled Components
const CheckoutContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

const CheckoutCard = styled(motion.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`;

const Title = styled.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { addOrder, getOrdersByPhone } = useOrders();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone) return toast.error("Vui lòng nhập số điện thoại!");
    
    // Check order limit (max 2 active orders per phone number)
    const existingOrders = getOrdersByPhone(form.phone);
    const activeOrders = existingOrders.filter((order: any) => 
      order.status === "Processing" || order.status === "Delivering"
    );
    
    if (activeOrders.length >= 2) {
      toast.error("Bạn đã đặt nhiều hơn số đơn hàng quy định! Chờ một xíu nhé!");
      return;
    }
    
    const fakeCart = [
      { name: "Pizza Sky", qty: 1, price: 8.9 },
      { name: "Burger Drone", qty: 2, price: 6.5 },
    ];
    const total = fakeCart.reduce((t, i) => t + i.qty * i.price, 0);
    
    // Show order summary with Vietnamese currency
    toast(`Tổng tiền: ${formatVND(total)}`, { 
      icon: "💰",
      duration: 3000 
    });

    addOrder({
      id: Date.now().toString(),
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: fakeCart,
      total,
      status: "Processing",
      dronePath: ["Nhà hàng", "Kho Drone", "Đang giao", "Hoàn tất"],
    });
    
    toast.success("Bạn đã đặt hàng thành công!");
    navigate("/orders");
  };

  return (
    <CheckoutContainer>
      <CheckoutCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Thông tin thanh toán</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Họ tên *</Label>
            <Input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              placeholder="Nhập họ tên của bạn"
            />
          </FormGroup>

          <FormGroup>
            <Label>Số điện thoại *</Label>
            <Input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              required 
              placeholder="Nhập số điện thoại"
              type="tel"
            />
          </FormGroup>

          <FormGroup>
            <Label>Địa chỉ *</Label>
            <Input 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              required 
              placeholder="Nhập địa chỉ giao hàng"
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Đặt hàng
          </SubmitButton>
        </form>
      </CheckoutCard>
    </CheckoutContainer>
  );
};

export default Checkout;