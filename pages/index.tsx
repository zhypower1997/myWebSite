import Head from "next/head";
import { Typography, Space } from "antd";
import ResumeButton from "../components/resume/ResumeButton";
import resumeStyles from "../styles/resume.module.scss";
import { useEffect, useState } from "react";
import { BlockProps, BlOCKNAME } from "../components/blocks/BlockTypes";

export default function Home(props) {
  const { BlockDatas } = props;
  const [blockDatas, setBlockDatas] = useState(
    BlockDatas.filter((item) => {
      if (item.isUsed) {
        return item;
      }
    }).concat(
      BlockDatas.filter((item) => {
        if (!item.isUsed) {
          return item;
        }
      })
    )
  ); // 初始化数据，将使用和未使用分段区分，便于拖拽排序
  const { Title } = Typography;
  const [dragIndex, setDragIndex] = useState(0); // 拖拽下标
  const [dropIndex, setDropIndex] = useState(0); // 放置下标

  const handlerDelete = function (moduleBtnsIndex) {
    // 清空字段的数据
    blockDatas.forEach((item) => {
      if (item.blockId == moduleBtnsIndex) {
        item.isUsed = false;
      }
    });
    setBlockDatas([...blockDatas]);
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
                  {Array.isArray(blockDatas) &&
                    blockDatas
                      .filter((item) => {
                        if (item.isUsed) {
                          return item;
                        }
                      })
                      .map((moduleBtnsItem, moduleBtnsIndex) => {
                        return (
                          <div
                            key={moduleBtnsIndex}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDropIndex(moduleBtnsIndex + 1);
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
                              onDragStart={(e) => {
                                setDragIndex(moduleBtnsIndex);
                              }}
                              onDragEnd={(e) => {
                                e.preventDefault();
                                let temp = blockDatas[dragIndex];
                                blockDatas[dragIndex] =
                                  blockDatas[dropIndex - 1];
                                blockDatas[dropIndex - 1] = temp;
                                setBlockDatas([...blockDatas]);
                                setDropIndex(0);
                              }}
                            >
                              <ResumeButton
                                title={BlOCKNAME[moduleBtnsItem.blockId]}
                                isDrag
                                onDelete={() => {
                                  handlerDelete(moduleBtnsItem.blockId);
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
                添加模块
              </Title>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              {Array.isArray(blockDatas) &&
                blockDatas
                  .filter((item) => {
                    if (!item.isUsed) {
                      return item;
                    }
                  })
                  .map((moduleBtnsItem, moduleBtnsIndex) => {
                    return (
                      <div key={moduleBtnsIndex}>
                        <div>
                          <ResumeButton
                            title={BlOCKNAME[moduleBtnsItem.blockId]}
                            onDelete={() => {
                              handlerDelete(moduleBtnsItem.blockId);
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
              {Array.isArray(blockDatas) &&
                blockDatas
                  .filter((item, index) => {
                    if (item.isUsed) {
                      return item;
                    }
                  })
                  .map((item, index) => <div key={index}>{item.blockId}</div>)}
            </div>
          </div>
          <div className={resumeStyles.resume_edit}></div>
        </div>
      </div>
    </div>
  );
}

let a = async function () {
  return new Promise((res, rej) => {
    res([
      {
        blockId: "1",
        rawDatas: [
          {
            id: "1",
            value: "张三",
            name: "姓名",
            isRequired: true,
            typeId: "0",
          },
        ],
        isUsed: true,
      },
      { blockId: "2", rawDatas: [], isUsed: false },
      {
        blockId: "3",
        rawDatas: [
          {
            id: "1",
            value: "张三",
            name: "姓名",
            isRequired: true,
            typeId: "0",
          },
        ],
        isUsed: true,
      },
      {
        blockId: "4",
        rawDatas: [
          {
            id: "1",
            value: "张三",
            name: "姓名",
            isRequired: true,
            typeId: "0",
          },
        ],
        isUsed: true,
      },
    ]);
  });
};
Home.getInitialProps = async () => {
  let b = await a();
  return {
    BlockDatas: b,
  };
};
