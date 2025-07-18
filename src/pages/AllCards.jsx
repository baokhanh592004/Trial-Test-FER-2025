// Giả sử file này ở src/pages/AllCards.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UpdateCardForm from '../components/UpdateCardForm'; // Import component mới tạo

export default function AllCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  
  // State để điều khiển modal update
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // State để lưu card đang được chọn để sửa
  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = useNavigate();

  // Hàm fetchCards không đổi
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_API_URL);
      setCards(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Lỗi khi fetch cards:', error);
      setAlert({ show: true, message: 'Không thể tải dữ liệu!', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Hàm handleDelete không đổi
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa card này không?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
        setAlert({ show: true, message: 'Xóa thành công!', variant: 'success' });
        fetchCards();
      } catch (err) {
        console.error('Lỗi khi xóa:', err);
        setAlert({ show: true, message: 'Lỗi khi xóa!', variant: 'danger' });
      }
    }
  };

  // --- LOGIC CHO UPDATE ---

  // Khi nhấn nút "Update", lưu card và mở modal
  const handleUpdateClick = (card) => {
    setSelectedCard(card);
    setShowUpdateModal(true);
  };

  // Hàm được gọi từ UpdateCardForm sau khi cập nhật thành công
  const handleUpdated = () => {
    setShowUpdateModal(false); // Đóng modal
    setAlert({ show: true, message: 'Cập nhật thành công!', variant: 'success' });
    fetchCards(); // Tải lại danh sách
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách Cards</h3>
        <Button variant="success" onClick={() => navigate('/SE181542/AddCard')}>
          Thêm Card mới
        </Button>
      </div>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p className="mt-2">Đang tải...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Card Name</th>
              <th>Branch</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id}>
                {/* Các ô có thể click để xem chi tiết */}
                <td onClick={() => navigate(`/card/${card.id}`)} style={{ cursor: 'pointer' }}>{card.cardName}</td>
                <td onClick={() => navigate(`/card/${card.id}`)} style={{ cursor: 'pointer' }}>{card.branch}</td>
                <td onClick={() => navigate(`/card/${card.id}`)} style={{ cursor: 'pointer' }}>{card.price}</td>
                
                {/* Ngăn click vào hàng khi click vào nút */}
                <td onClick={(e) => e.stopPropagation()}>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdateClick(card)}>
                    Update
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(card.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Render Modal Update Form và truyền props vào */}
      {selectedCard && (
        <UpdateCardForm
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          cardData={selectedCard}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}