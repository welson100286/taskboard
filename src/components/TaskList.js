'use client'

import Link from "next/link";
/**
 * TaskList 組件 - 這是一個 React 函數組件
 * 
 * 基礎概念解釋：
 * - React 組件是構建用戶界面的基本單位
 * - 函數組件是最簡單的 React 組件形式，本質上就是一個返回 JSX 的函數
 * - props（屬性）是組件接收外部數據的方式
 * 
 * @component
 * @param {Object} props - 組件的屬性對象
 * @param {Array<string>} props.tasks - 任務陣列。通過解構賦值 {tasks} 直接獲取
 *                                     解構賦值是 ES6 的特性，等同於 props.tasks
 * @returns {JSX.Element} 返回 JSX 元素，會被 React 渲染為實際的 DOM 元素
 */
export default function TaskList({ tasks, onDelete }) {
    return (
        // <ul> 是無序列表元素，用於展示列表型數據
        // className 是 React 中指定 CSS 類別的方式（等同於 HTML 的 class 屬性）
        // space-y-2：這是 Tailwind CSS 的工具類，為列表項之間添加 0.5rem（8px）的垂直間距
        <ul className="space-y-2">
            {/* 
            array.map() 方法：
            - 用於遍歷陣列中的每個元素
            - 將每個元素轉換為 JSX 元素
            - (task, index) => ... 是一個箭頭函數，接收當前元素和它的索引
            */}
            {tasks.map((task) => (
                // <li> 是列表項目元素
                <li
                    // key 屬性：
                    // - React 需要它來追踪列表中的元素
                    // - 幫助 React 高效地更新 DOM
                    // - 在實際應用中最好使用唯一的 ID 而不是索引
                    key={task.id}
                    // Tailwind CSS 類別組合：
                    // - border：添加 1px 的邊框
                    // - p-2：添加 0.5rem（8px）的內邊距
                    // - rounded：添加圓角邊框
                    className="border p-2 rounded flex justify-between items-center"
                >
                    {/* 
                    直接渲染任務文本
                    大括號 {} 用於在 JSX 中嵌入 JavaScript 表達式
                    */}
                    <Link 
                        href={`/task/${task.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {task.title}
                    </Link>
                    <button
                        className="text-red-500"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}