import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { LuListTodo } from "react-icons/lu";
import {
  OrderedListOutlined,
  PlusCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Dropdown, theme } from "antd";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "myTask",
    label: (
      <NavLink className="flex items-center gap-10" to="/profile/mytodo">
        <OrderedListOutlined />
        My Tasks{" "}
      </NavLink>
    ),
  },
  {
    key: "addTask",
    label: (
      <NavLink className="flex items-center gap-10" to="/profile/addTodo">
        <PlusCircleOutlined />
        Add Task
      </NavLink>
    ),
  },
  {
    key: "today",
    label: (
      <NavLink className="flex items-center gap-10" to="/profile/today">
        <CalendarOutlined />
        Today
      </NavLink>
    ),
  },
  {
    key: "upcomming",
    label: (
      <NavLink className="flex items-center gap-10" to="/profile/upcomming">
        <ClockCircleOutlined />
        Upcoming
      </NavLink>
    ),
  },
];

const ProfileDash = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // const user = GetUserInfo();
  console.log(user);
  const email = user?.email;
  console.log(user);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userInfo/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        console.log(data);
      });
  }, [user]);

  const logoutHandler = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dropItems = [
    {
      label: (
        <NavLink
          className="btn btn-sm btn-ghost w-full border-none flex items-center gap-10"
          to={`/profile/userProfile/${email}`}
        >
          Profile
        </NavLink>
      ),
      key: "1",
    },
    {
      label: (
        <button
          className="btn btn-sm btn-ghost w-full border-none"
          onClick={logoutHandler}
        >
          {" "}
          Log out{" "}
        </button>
      ),
      key: "2",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    console.log("Clicked on menu item:", e);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="w-40">
      {dropItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <div
            className={`h-[150px] flex ${
              collapsed ? "flex-col" : ""
            } items-center justify-center`}
          >
            <div
              className={`border-b-[1px] pb-7 flex ${
                collapsed ? "flex-col " : ""
              } items-center justify-center gap-3`}
            >
              <div className={`bg-stone-50 rounded-xl text-[#001529] ${
                collapsed ? "text-2xl p-1" : ""
              }text-3xl p-3 `}>
                <LuListTodo />
              </div>
              <div>
                <p className={`font-light text-yellow-50 ${
                collapsed ? "text-xl p-2" : ""
              }text-3xl`}>Listify</p>
              </div>
            </div>
          </div>
          {items?.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center justify-end">
            <Dropdown overlay={menu} placement="bottomRight">
              <span className=" place-items-center mr-10 py-2">
                <img
                  className="border size-[50px] rounded-full"
                  src={info[0]?.image || user?.photoURL}
                  alt="Profile"
                />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 20,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: 3,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileDash;
