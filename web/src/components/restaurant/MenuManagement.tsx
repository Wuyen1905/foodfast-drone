import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Product, products as initialProducts } from '../../data/products';
import { formatVND } from '../../utils/currency';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

interface MenuManagementProps {
  restaurantId: string;
  theme: Theme;
}

const MenuContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const SectionTitle = styled.h2<{ $primary: string }>`
  color: ${props => props.$primary};
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const AddButton = styled.button<{ $primary: string }>`
  padding: 12px 24px;
  background: ${props => props.$primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SearchFilterBar = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const ProductCard = styled(motion.div)<{ $accent: string }>`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid ${props => props.$accent};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
`;

const ProductInfo = styled.div``;

const ProductName = styled.h3`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: #666;
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.5;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ProductPrice = styled.div<{ $primary: string }>`
  color: ${props => props.$primary};
  font-size: 20px;
  font-weight: 700;
`;

const ProductCategory = styled.span`
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
`;

const AvailabilityBadge = styled.div<{ $available: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  background: ${props => props.$available ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$available ? '#155724' : '#721c24'};
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' | 'toggle' }>`
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 80px;
  
  ${props => {
    if (props.$variant === 'edit') {
      return `
        background: #28a745;
        color: white;
        &:hover {
          background: #218838;
        }
      `;
    } else if (props.$variant === 'toggle') {
      return `
        background: #17a2b8;
        color: white;
        &:hover {
          background: #138496;
        }
      `;
    } else {
      return `
        background: #dc3545;
        color: white;
        &:hover {
          background: #c82333;
        }
      `;
    }
  }}
`;

const Modal = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3<{ $primary: string }>`
  color: ${props => props.$primary};
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #333;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary'; $primary?: string }>`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: ${props.$primary || '#007bff'};
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  ` : `
    background: #6c757d;
    color: white;
    &:hover {
      background: #5a6268;
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const MenuManagement: React.FC<MenuManagementProps> = ({ restaurantId, theme }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Rice' as Product['category'],
    tag: '' as '' | 'Hot' | 'New',
    isAvailable: true
  });

  useEffect(() => {
    // Filter products for this restaurant
    const restaurantProducts = initialProducts.filter(p => p.restaurantId === restaurantId);
    setProducts(restaurantProducts);
    setFilteredProducts(restaurantProducts);
  }, [restaurantId]);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'Rice',
      tag: '',
      isAvailable: true
    });
    setShowModal(true);
  };

  const handleToggleAvailability = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId
        ? { ...p, isAvailable: p.isAvailable === undefined ? false : !p.isAvailable }
        : p
    ));
    const product = products.find(p => p.id === productId);
    const newStatus = product?.isAvailable === undefined ? false : !product.isAvailable;
    toast.success(newStatus ? '✅ Món ăn đã được kích hoạt!' : '⚠️ Món ăn đã được tạm ngưng!');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image || '',
      category: product.category,
      tag: product.tag || '',
      isAvailable: product.isAvailable !== undefined ? product.isAvailable : true
    });
    setShowModal(true);
  };

  const handleDelete = (productId: string) => {
    try {
      if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
        setProducts(products.filter(p => p.id !== productId));
        toast.success('🗑️ Món ăn đã được xóa thành công!');
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
      toast.error('❌ Không thể xóa món ăn. Vui lòng thử lại.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error('❌ Please enter a valid price greater than 0.');
        return;
      }

      if (editingProduct) {
        // Update existing product
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? {
                ...p,
                name: formData.name,
                price: price,
                description: formData.description,
                image: formData.image || undefined,
                category: formData.category,
                tag: formData.tag || undefined,
                isAvailable: formData.isAvailable
              }
            : p
        ));
        toast.success('⚙️ Món ăn đã được cập nhật thành công!');
      } else {
        // Add new product
        const newProduct: Product = {
          id: `${restaurantId}_${Date.now()}`,
          name: formData.name,
          price: price,
          description: formData.description,
          image: formData.image || undefined,
          category: formData.category,
          tag: formData.tag || undefined,
          restaurantId,
          isAvailable: formData.isAvailable
        };
        setProducts([...products, newProduct]);
        toast.success('✅ Món ăn mới đã được thêm thành công!');
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving dish:', error);
      toast.error('❌ Failed to save dish. Please try again.');
    }
  };

  const categories = Array.from(new Set(initialProducts.map(p => p.category)));

  return (
    <>
      <MenuContainer>
        <SectionHeader>
          <SectionTitle $primary={theme.primary}>
            🍽️ Quản lí thực đơn
          </SectionTitle>
          <AddButton $primary={theme.primary} onClick={handleAdd}>
            ➕ Thêm món mới
          </AddButton>
        </SectionHeader>

        {/* Search and Filter */}
        <SearchFilterBar>
          <SearchInput
            type="search"
            placeholder="🔍 Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </SearchFilterBar>

        {filteredProducts.length === 0 ? (
          <EmptyState>
            <h3>Chưa có món ăn nào</h3>
            <p>Bắt đầu bằng cách thêm món ăn đầu tiên của bạn!</p>
          </EmptyState>
        ) : (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                $accent={theme.accent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                {product.image && (
                  <ProductImage style={{ backgroundImage: `url(${product.image})` }} />
                )}
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductMeta>
                    <ProductPrice $primary={theme.primary}>
                      {formatVND(product.price)}
                    </ProductPrice>
                    <ProductCategory>{product.category}</ProductCategory>
                  </ProductMeta>
                  {product.tag && (
                    <ProductCategory style={{ marginBottom: '12px', display: 'inline-block' }}>
                      {product.tag === 'Hot' ? '🔥 Hot' : '✨ New'}
                    </ProductCategory>
                  )}
                  <AvailabilityBadge $available={product.isAvailable !== false}>
                    {product.isAvailable !== false ? '✅ Đang phục vụ' : '⛔ Tạm ngưng'}
                  </AvailabilityBadge>
                  <ProductActions>
                    <ActionButton $variant="edit" onClick={() => handleEdit(product)}>
                      ✏️ Sửa
                    </ActionButton>
                    <ActionButton 
                      $variant="toggle" 
                      onClick={() => handleToggleAvailability(product.id)}
                    >
                      {product.isAvailable !== false ? '⏸️ Tạm ngưng' : '▶️ Kích hoạt'}
                    </ActionButton>
                    <ActionButton $variant="delete" onClick={() => handleDelete(product.id)}>
                      🗑️ Xóa
                    </ActionButton>
                  </ProductActions>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
      </MenuContainer>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalTitle $primary={theme.primary}>
            {editingProduct ? '✏️ Sửa món ăn' : '➕ Thêm món mới'}
          </ModalTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Tên món ăn *</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Nhập tên món ăn"
              />
            </FormGroup>

            <FormGroup>
              <Label>Giá (₫) *</Label>
              <Input
                type="number"
                step="1000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="50000"
              />
            </FormGroup>

            <FormGroup>
              <Label>Mô tả *</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                placeholder="Mô tả món ăn..."
              />
            </FormGroup>

            <FormGroup>
              <Label>URL hình ảnh</Label>
              <Input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>

            <FormGroup>
              <Label>Danh mục *</Label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                required
              >
                <option value="Rice">Rice</option>
                <option value="Noodles">Noodles</option>
                <option value="Asian">Asian</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Dessert">Dessert</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Sushi">Sushi</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Tag (Tùy chọn)</Label>
              <Select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value as '' | 'Hot' | 'New' })}
              >
                <option value="">Không có</option>
                <option value="Hot">🔥 Hot</option>
                <option value="New">✨ New</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                Món ăn đang được phục vụ (Available)
              </Label>
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" $variant="primary" $primary={theme.primary}>
                {editingProduct ? 'Cập nhật món ăn' : 'Thêm món ăn'}
              </Button>
              <Button type="button" $variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MenuManagement;
