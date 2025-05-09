/**
 * 'use client' 指令
 * - Next.js 特有的指令
 * - 告訴 Next.js 這是一個客戶端組件
 * - 客戶端組件可以使用瀏覽器 API 和 React 的互動功能（如 useState）
 */
'use client';

/**
 * 導入需要的依賴
 * - import 是 ES6 模組系統的語法，用於導入其他文件的代碼
 * - Next/image：Next.js 提供的圖片優化組件
 * - useState：React 的 Hook，用於在函數組件中管理狀態
 * - TaskList：我們自定義的任務列表組件
 */
import Link from "next/link";
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";

/**
 * Home 組件 - 應用程序的主頁面組件
 * 
 * 基礎概念解釋：
 * 1. React 組件：
 *    - 是構建用戶界面的基本單位
 *    - 可以包含其他組件（如這裡使用了 TaskList）
 *    - 可以管理自己的狀態
 * 
 * 2. 函數組件：
 *    - 是一個返回 JSX 的 JavaScript 函數
 *    - 命名必須以大寫字母開頭
 *    - 可以使用 Hooks（如 useState）來管理狀態
 * 
 * @returns {JSX.Element} 返回要渲染的 JSX 元素
 */
export default function Home() {
  /**
   * 使用 useState Hook 管理狀態
   * 
   * useState 解釋：
   * - 返回一個包含兩個元素的陣列：
   *   1. 當前狀態值
   *   2. 更新狀態的函數
   * - 使用陣列解構賦值來獲取這兩個值
   * 
   * 例如：const [tasks, setTasks] = useState([]) 意味著：
   * - tasks：儲存任務的陣列（初始值為空陣列 []）
   * - setTasks：用於更新 tasks 的函數
   */
  const [tasks, setTasks] = useState([]); // 儲存所有任務
  const [newTask, setNewTesk] = useState(''); // 儲存用戶輸入的新任務

  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  }, []);

  /**
   * addTask 函數 - 處理添加新任務的邏輯
   * 
   * 函數流程説明：
   * 1. console.log 用於調試，顯示當前狀態
   * 2. 創建新的任務陣列：
   *    - [...tasks, newTask] 使用展開運算符（...）
   *    - 展開運算符會複製原有陣列的所有元素
   *    - 然後將新任務添加到陣列末尾
   * 3. 使用 setTasks 更新狀態
   * 4. 清空輸入框（通過設置 newTask 為空字符串）
   */
  const addTask = () => {
    console.log("Before" + tasks); // 顯示添加前的任務列表
    console.log("NewTask:", newTask); // 顯示要添加的新任務

    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };

    const updatedTasks = [...tasks, newTaskObj]; // 創建包含新任務的陣列
    setTasks(updatedTasks); // 更新任務狀態
    console.log("After", updatedTasks); // 顯示添加後的任務列表
    setNewTesk(''); // 重置輸入框

    setNextId(nextId + 1);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  /**
   * 組件的渲染部分
   * 
   * JSX 語法解釋：
   * - 看起來像 HTML，但實際上是 JavaScript
   * - 使用 className 而不是 class（因為 class 是 JS 關鍵字）
   * - 可以在 {} 中嵌入 JavaScript 表達式
   * - 每個 JSX 元素只能有一個根元素（這裡是 <main>）
   */
  return (
    // main 元素包含整個應用界面
    // p-4：Tailwind CSS 類，表示 padding: 1rem（16px）
    <main className="p-4 max-w-md mx-auto">
      {/* 標題部分 */}
      <h1 className="text-2xl font-bold">Tesk Board</h1>

      {/* 
      輸入區域
      flex：使用 Flexbox 佈局
      gap-2：元素之間的間距為 0.5rem
      mb-4：底部外邊距為 1rem
      */}
      <div className="flex gap-2 mb-4">
        {/* 
        輸入框
        value 和 onChange 是受控組件的兩個必要屬性：
        - value：輸入框的當前值，來自 state
        - onChange：處理輸入變化的事件處理函數
        */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a tesk"
          value={newTask}
          // e.target.value 獲取輸入框的新值
          onChange={(e) => setNewTesk(e.target.value)}
        />
        {/* 
        添加按鈕
        onClick：點擊事件處理函數
        使用了 Tailwind 的顏色和內邊距類
        */}
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* 
      任務列表組件
      - 將 tasks 陣列作為 props 傳遞給 TaskList 組件
      - TaskList 組件負責將任務陣列渲染為實際的列表
      */}
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </main>
  );
}
