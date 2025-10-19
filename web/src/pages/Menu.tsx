import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductCardSkeletons from '../components/ProductCardSkeleton';
import { useAuth } from '../AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Page = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
`;

const Controls = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 12px; 
  margin-bottom: 16px;
  
  @media (max-width: 768px) { 
    grid-template-columns: 1fr; 
    gap: 8px;
  }
`;

const Input = styled.input`
  padding: 10px 12px; 
  border: 1px solid var(--border); 
  border-radius: var(--radius); 
  outline: none;
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
  }
`;

const Select = styled.select`
  padding: 10px 12px; 
  border: 1px solid var(--border); 
  border-radius: var(--radius); 
  outline: none; 
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const AdminControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const AdminButton = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--card);
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 90%;
  max-width: 500px;
`;

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background: var(--border);
  color: var(--text);
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
`;

const SaveButton = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
`;

const Menu: React.FC = () => {
  const { user } = useAuth();
  const { add } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | 'Burger' | 'Pizza' | 'Sushi'>('All');
  const [sort, setSort] = useState<'lh' | 'hl'>('lh');
  const [items, setItems] = useState<Product[]>(products);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Burger',
    description: '',
    image: ''
  });

  useEffect(() => { 
    const timer = setTimeout(() => {
      setItems(products);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = items
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .filter(p => category === 'All' ? true : p.category === category)
    .sort((a, b) => sort === 'lh' ? a.price - b.price : b.price - a.price);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: 'Burger',
      description: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const updatedItems = items.filter(p => p.id !== productId);
      setItems(updatedItems);
      toast.success('✅ Đã xóa sản phẩm thành công!');
    }
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price) {
      toast.error('⚠ Vui lòng điền đầy đủ thông tin');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('⚠ Giá tiền không hợp lệ');
      return;
    }

    if (editingProduct) {
      // Edit existing product
      const updatedItems = items.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price }
          : p
      );
      setItems(updatedItems);
      toast.success('✅ Đã cập nhật sản phẩm thành công!');
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        price,
        rating: 4.5,
        reviews: 0
      };
      setItems([...items, newProduct]);
      toast.success('✅ Đã thêm sản phẩm mới thành công!');
    }

    setShowModal(false);
  };

  const handleAddToCart = (product: Product) => {
    // Check if user is logged in
    if (!user) {
      // For guest users, redirect to customer info form
      toast.info('🔐 Vui lòng cung cấp thông tin để tiếp tục đặt hàng');
      navigate('/customer-info');
      return;
    }
    
    // Add to cart using CartContext for logged-in users
    add(product.id, 1, { 
      name: product.name, 
      image: product.image, 
      price: product.price 
    });
    toast.success(`✅ Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <Page>
      <Title>{user?.role === 'admin' ? 'Quản lý thực đơn' : 'Thực đơn'}</Title>
      
      {user?.role === 'admin' && (
        <AdminControls>
          <AdminButton onClick={handleAddProduct}>
            ➕ Thêm món mới
          </AdminButton>
        </AdminControls>
      )}
      
      <Controls>
        <Input 
          placeholder="Tìm kiếm món ăn" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
        />
        <Select value={category} onChange={e => setCategory(e.target.value as any)}>
          <option>Tất cả</option>
          <option>Burger</option>
          <option>Pizza</option>
          <option>Sushi</option>
        </Select>
        <Select value={sort} onChange={e => setSort(e.target.value as any)}>
          <option value="lh">Giá: Thấp → Cao</option>
          <option value="hl">Giá: Cao → Thấp</option>
        </Select>
      </Controls>
      
      {loading ? (
        <ProductCardSkeletons count={6} />
      ) : (
        <Grid>
          {filteredItems.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard 
                product={p} 
                isAdmin={user?.role === 'admin'}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </Grid>
      )}

      <Modal isOpen={showModal}>
        <ModalContent>
          <ModalTitle>
            {editingProduct ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}
          </ModalTitle>
          
          <FormGroup>
            <Label>Tên món ăn *</Label>
            <FormInput
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên món ăn"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Giá tiền *</Label>
            <FormInput
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              placeholder="Nhập giá tiền"
              min="0"
              step="0.01"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Danh mục</Label>
            <FormSelect
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Sushi">Sushi</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <Label>Mô tả</Label>
            <FormTextArea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả món ăn"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>URL hình ảnh</Label>
            <FormInput
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              placeholder="Nhập URL hình ảnh"
            />
          </FormGroup>
          
          <ButtonGroup>
            <CancelButton onClick={() => setShowModal(false)}>
              Hủy
            </CancelButton>
            <SaveButton onClick={handleSaveProduct}>
              {editingProduct ? 'Cập nhật' : 'Thêm mới'}
            </SaveButton>
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </Page>
  );
};

export default Menu;