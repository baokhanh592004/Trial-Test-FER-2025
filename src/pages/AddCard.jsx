import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardName: '',
    cardImage: '',
    price: '',
    available: false,
    branch: '',
  });

  const [errors, setErrors] = useState({});

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

    if (!form.cardName.trim()) {
      newErrors.cardName = 'Card name is required';
    } else if (form.cardName.trim().split(/\s+/).length < 2) {
      newErrors.cardName = 'Card name must be more than 1 word';
    }

    if (!form.cardImage.trim()) {
      newErrors.cardImage = 'Card image URL is required';
    } else if (!isValidUrl(form.cardImage.trim())) {
      newErrors.cardImage = 'Card image must be a valid URL';
    }

    if (!form.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(form.price)) {
      newErrors.price = 'Price must be a number';
    }

    if (!form.branch) {
      newErrors.branch = 'Branch is required';
    }

    setErrors(newErrors);

    // Nếu không có lỗi trả về true
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Gửi dữ liệu lên API (POST)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };
      await axios.post(import.meta.env.VITE_API_URL, payload);
      alert('Add card thành công!');
      navigate('/rollnumber/AllCards'); // chuyển hướng sau khi thêm thành công
    } catch (error) {
      console.error('Lỗi khi thêm card:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h3>Thêm mới Card</h3>
      <Form onSubmit={handleSubmit} noValidate>
        {/* Card Name */}
        <Form.Group className="mb-3" controlId="cardName">
          <Form.Label>Card Name</Form.Label>
          <Form.Control
            type="text"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            isInvalid={!!errors.cardName}
            placeholder="Nhập tên card"
          />
          <Form.Control.Feedback type="invalid">{errors.cardName}</Form.Control.Feedback>
        </Form.Group>

        {/* Card Image */}
        <Form.Group className="mb-3" controlId="cardImage">
          <Form.Label>Card Image URL</Form.Label>
          <Form.Control
            type="text"
            name="cardImage"
            value={form.cardImage}
            onChange={handleChange}
            isInvalid={!!errors.cardImage}
            placeholder="Nhập URL ảnh"
          />
          <Form.Control.Feedback type="invalid">{errors.cardImage}</Form.Control.Feedback>
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
            placeholder="Nhập giá"
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>

        {/* Available (Switch) */}
        <Form.Group className="mb-3" controlId="available">
          <Form.Check
            type="switch"
            label="Available"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Branch (Select) */}
        <Form.Group className="mb-3" controlId="branch">
          <Form.Label>Branch</Form.Label>
          <Form.Select
            name="branch"   
            value={form.branch}
            onChange={handleChange}
            isInvalid={!!errors.branch}
          >
            <option value="">-- Chọn Branch --</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="AMD">AMD</option>
            <option value="INTEL">INTEL</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.branch}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Thêm Card
        </Button>
      </Form>
    </div>
  );
}
