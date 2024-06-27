 
 
import { Suspense } from "react";
import "./App.css";
import AppLayout from "./layout/Layout";
import { ConfigProvider, Spin } from "antd";
import { useGlobalStore } from "./stores";
import zhCN from "antd/locale/zh_CN";


const App: React.FC = () => {
  const { primaryColor } = useGlobalStore();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <Suspense fallback={<Spin size="large" className="globa_spin" />}>
        <AppLayout />
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
