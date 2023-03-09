import React from "react";
import { MenuProps } from "antd";
import {
  PieChartOutlined,
  ShoppingCartOutlined,
  PushpinOutlined,
  UserSwitchOutlined,
  TagsOutlined,
  ApartmentOutlined,
  ShoppingOutlined,
  IdcardOutlined,
  MoneyCollectOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const admin: MenuProps["items"] = [
  {
    label: <Link to={"/resellers"}>Revendedores</Link>,
    key: "resellers",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: <Link to={"/cities"}>Cidades</Link>,
    key: "cities",
    icon: <PushpinOutlined />,
  },
  {
    label: <Link to={"/tags"}>Tags</Link>,
    key: "tags",
    icon: <TagsOutlined />,
  },
  {
    label: <Link to={"/sections"}>Secções</Link>,
    key: "sections",
    icon: <ApartmentOutlined />,
  },
  {
    label: <Link to={"/payment"}>Pagamentos</Link>,
    key: "payment",
    icon: <PayCircleOutlined />,
  },
];

const reseller: MenuProps["items"] = [
  {
    label: <Link to={"/"}>Dashboard</Link>,
    key: "dashboard",
    icon: <PieChartOutlined />,
  },
  {
    label: <Link to={"/my-data"}>Meus dados</Link>,
    key: "my-data",
    icon: <IdcardOutlined />,
  },
  {
    label: <Link to={"/sales"}>Minhas vendas</Link>,
    key: "sales",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: <Link to={"/products"}>Produtos</Link>,
    key: "products",
    icon: <ShoppingOutlined />,
  },
  {
    label: <Link to={"/transactions"}>Transações</Link>,
    key: "transactions",
    icon: <MoneyCollectOutlined />,
  },
];

const MENU_TYPES = {
  admin,
  sysadmin: [
    {
      label: <Link to={"/"}>Dashboard</Link>,
      key: "dashboard",
      icon: <PieChartOutlined />,
    },
    ...admin,
    {
      label: <Link to={"/users"}>Usuários</Link>,
      key: "users",
      icon: <UserSwitchOutlined />,
    },
  ],
  reseller: [
    ...reseller,
    {
      label: <Link to={"/users"}>Usuários</Link>,
      key: "users",
      icon: <UserSwitchOutlined />,
    },
  ],
  user: [
    {
      label: <Link to={"/sales"}>Vendas</Link>,
      key: "sales",
      icon: <ShoppingCartOutlined />,
    },
  ],
};

export default MENU_TYPES;
