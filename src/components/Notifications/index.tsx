import React from 'react';
import { Empty } from 'antd';


const Notifications: React.FC = () => {
  return (
    <Empty
      image={ Empty.PRESENTED_IMAGE_SIMPLE }
      description="Você ainda não possui notificações!"
    />
  );
}

export default Notifications;
