import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Component nhận props để điều khiển modal và dữ liệu
export default function UpdateCardForm({ show, onHide, cardData, onUpdated }) {
  // State cho dữ liệu form, ban đầu trống
  const [form, setForm] = useState({
    cardName: '',
    cardImage: '',
    price: '',
    available: false,
    branch: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook useEffect để điền dữ liệu vào form khi một card được chọn
  // Nó sẽ chạy mỗi khi prop `cardData` thay đổi
  useEffect(() => {
    if (cardData) {
      setForm({
        cardName: cardData.cardName || '',
        cardImage: cardData.cardImage || '',
        price: cardData.price || '',
        available: cardData.available || false,
        branch: cardData.branch || '',
      });
    }
  }, [cardData]);

  // Hàm kiểm tra URL hợp lệ 
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Validate form dữ liệu 
  const validate = () => {
    const newErrors = {};
    if (!form.cardName.trim() || form.cardName.trim().split(/\s+/).length < 2) {
      newErrors.cardName = 'Card name must be more than 1 word';
    }
    if (!form.cardImage.trim() || !isValidUrl(form.cardImage.trim())) {
      newErrors.cardImage = 'Card image must be a valid URL';
    }
    if (!form.price || isNaN(form.price)) {
      newErrors.price = 'Price must be a valid number';
    }
    if (!form.branch) {
      newErrors.branch = 'Branch is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Hàm handleSubmit đã được cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };
      // Gửi request PUT tới API với ID của card
      await axios.put(`${import.meta.env.VITE_API_URL}/${cardData.id}`, payload);
      
      // Gọi hàm onUpdated() từ props để báo cho component cha
      onUpdated(); 
    } catch (error) {
      console.error('Lỗi khi cập nhật card:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Nếu không có cardData, không render gì cả
  if (!cardData) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Card: {cardData.cardName}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          {/* Các Form.Group giữ nguyên như file AddCard.js */}
          <Form.Group className="mb-3" controlId="updateCardName">
            <Form.Label>Card Name</Form.Label>
            <Form.Control type="text" name="cardName" value={form.cardName} onChange={handleChange} isInvalid={!!errors.cardName}/>
            <Form.Control.Feedback type="invalid">{errors.cardName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="updateCardImage">
            <Form.Label>Card Image URL</Form.Label>
            <Form.Control type="text" name="cardImage" value={form.cardImage} onChange={handleChange} isInvalid={!!errors.cardImage}/>
            <Form.Control.Feedback type="invalid">{errors.cardImage}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="updatePrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={form.price} onChange={handleChange} isInvalid={!!errors.price}/>
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="updateAvailable">
            <Form.Check type="switch" label="Available" name="available" checked={form.available} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="updateBranch">
            <Form.Label>Branch</Form.Label>
            <Form.Select name="branch" value={form.branch} onChange={handleChange} isInvalid={!!errors.branch}>
              <option value="">-- Chọn Branch --</option>
              <option value="NVIDIA">NVIDIA</option>
              <option value="AMD">AMD</option>
              <option value="INTEL">INTEL</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.branch}</Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}