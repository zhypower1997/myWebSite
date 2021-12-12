import Head from "next/head";
import { Typography, Space } from "antd";
import ResumeButton from "../components/resume/ResumeButton";
import resumeStyles from "../styles/resume.module.scss";
import { useState } from "react";

export default function Home() {
  const { Title } = Typography;
  const [moduleBtns, setModuleBtns] = useState([
    "2教育经历",
    "1实习经历",
    "3项目经历",
  ]);
  const [addModuleBtns, setAddModuleBtns] = useState(["4荣誉奖项"]);
  const [dragIndex, setDragIndex] = useState(0);
  const [dropIndex, setDropIndex] = useState(0);

  const handlerDelete = function (moduleBtnsIndex) {
    setAddModuleBtns([...addModuleBtns, moduleBtns.splice(moduleBtnsIndex, 1)]);
    setModuleBtns([...moduleBtns]);
  };

  return (
    <div>
      <Head>
        <title>简历生成器</title>
      </Head>
      <div>
        <div className={resumeStyles.resume_container}>
          <div className={resumeStyles.resume_operate}>
            <div className={resumeStyles.resume_divider}>
              <Title level={5} style={{ color: "#515666" }}>
                模块管理
              </Title>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <ResumeButton title="基本信息" />
              <div>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {moduleBtns.map((moduleBtnsItem, moduleBtnsIndex) => {
                    return (
                      <div
                        key={moduleBtnsIndex}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDropIndex(moduleBtnsIndex + 1);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          let temp = moduleBtns[dragIndex];
                          moduleBtns[dragIndex] = moduleBtns[moduleBtnsIndex];
                          moduleBtns[moduleBtnsIndex] = temp;
                          setModuleBtns([...moduleBtns]);
                          setDropIndex(0);
                        }}
                        style={{
                          borderBottom:
                            dropIndex == moduleBtnsIndex + 1
                              ? "2px solid #68749c"
                              : "2px solid transparent",
                        }}
                      >
                        <div
                          draggable
                          onDragEnd={(e) => {
                            setDragIndex(moduleBtnsIndex);
                          }}
                        >
                          <ResumeButton
                            title={moduleBtnsItem}
                            isDrag
                            onDelete={() => {
                              handlerDelete(moduleBtnsIndex);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </Space>
              </div>
            </Space>
            <div className={resumeStyles.resume_divider}>
              <Title level={5} style={{ color: "#515666" }}>
                模块管理
              </Title>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              {addModuleBtns.map((moduleBtnsItem, moduleBtnsIndex) => {
                return (
                  <div key={moduleBtnsIndex}>
                    <div>
                      <ResumeButton
                        title={moduleBtnsItem}
                        onDelete={() => {
                          handlerDelete(moduleBtnsIndex);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </Space>
          </div>
          <div className={resumeStyles.resume_main}>
            <div className={resumeStyles.resume_main_body}>
              {moduleBtns.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>
          <div className={resumeStyles.resume_edit}></div>
        </div>
      </div>
    </div>
  );
}
