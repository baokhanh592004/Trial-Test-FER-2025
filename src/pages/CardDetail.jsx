import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Badge, Spinner } from 'react-bootstrap';

export default function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết card:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCard();
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return '';
    return `$${Number(price).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!card) {
    return <p className="text-center mt-5">Không tìm thấy thông tin card.</p>;
  }

  return (
    <div className="container mt-5">
      <Card>
        <div className="d-flex flex-wrap">

          {/* Phần ảnh bên trái */}
          <div className="card-image-container" style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <Card.Img
              variant="top"
              src={card.cardImage}
              alt={card.cardName}
              style={{
                objectFit: 'cover',
                height: '100%',
                width: '100%',
                maxHeight: '400px',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Phần thông tin bên phải */}
          <Card.Body className="card-info-container" style={{ flex: '2 1 400px' }}>
            <Card.Title>{card.cardName}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">{card.branch}</Card.Subtitle>

            <div className="card-availability mb-3">
              <strong>Available: </strong>
              {card.available ? (
                <Badge bg="success">Yes</Badge>
              ) : (
                <Badge bg="danger">No</Badge>
              )}
            </div>

            <div className="card-price">
              <strong>Price: </strong> {formatPrice(card.price)}
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}
