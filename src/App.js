import React, { useState, useEffect } from "react";
import { ThemeEngine, react } from "tiny-theming-engine";

const { ThemeToggleButton } = react;

const themes = {
  light: {
    "--bg": "#ffffff",
    "--text": "#333333",
    "--card-bg": "#f8f9fa",
    "--primary": "#007bff",
    "--border": "#dee2e6",
  },
  dark: {
    "--bg": "#1a1a1a",
    "--text": "#ffffff",
    "--card-bg": "#2d2d2d",
    "--primary": "#0d6efd",
    "--border": "#495057",
  },
};

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Stats for premium dashboard feel
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  // Premium styling separate from theme variables
  const premiumStyles = {
    container: {
      background: "linear-gradient(135deg, var(--bg) 0%, var(--card-bg) 100%)",
      minHeight: "100vh",
      padding: isMobile ? "1rem" : "2rem",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: "blur(10px)",
      background: "rgba(255,255,255,0.1)",
    },
    wrapper: {
      position: "relative",
      zIndex: 1,
      maxWidth: "700px",
      margin: "0 auto",
      color: "var(--text)",
      width: "100%",
      padding: isMobile ? "0 0.5rem" : "0",
    },
    header: {
      textAlign: "center",
      marginBottom: isMobile ? "2rem" : "3rem",
      position: "relative",
    },
    title: {
      fontSize: isMobile ? "2rem" : "3rem",
      fontWeight: "700",
      background: `linear-gradient(135deg, var(--primary) 0%, var(--text) 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      margin: 0,
      marginBottom: "0.5rem",
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontSize: "1.1rem",
      opacity: 0.7,
      margin: 0,
    },
    themeToggle: {
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem",
    },
    addCard: {
      background: "var(--card-bg)",
      borderRadius: isMobile ? "16px" : "20px",
      padding: isMobile ? "1.5rem" : "2rem",
      marginBottom: isMobile ? "1.5rem" : "2rem",
      boxShadow: `0 20px 40px rgba(0,0,0,0.1)`,
      border: `1px solid var(--border)`,
      backdropFilter: "blur(10px)",
    },
    inputContainer: {
      display: "flex",
      gap: isMobile ? "0.75rem" : "1rem",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
    },
    input: {
      flex: isMobile ? "none" : 1,
      width: isMobile ? "100%" : "auto",
      padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
      border: "none",
      borderRadius: "12px",
      fontSize: isMobile ? "1rem" : "1.1rem",
      background: "var(--bg)",
      color: "var(--text)",
      outline: "none",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    addButton: {
      background: "var(--primary)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: isMobile ? "0.875rem 1.5rem" : "1rem 2rem",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "600",
      boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
      transition: "all 0.3s ease",
      transform: "translateY(0)",
      width: isMobile ? "100%" : "auto",
    },
    todoList: {
      background: "var(--card-bg)",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: `0 20px 40px rgba(0,0,0,0.1)`,
      border: `1px solid var(--border)`,
      backdropFilter: "blur(10px)",
    },
    todoItem: {
      display: "flex",
      alignItems: "center",
      padding: "1rem 1.5rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    checkbox: {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "1rem",
      cursor: "pointer",
    },
    todoText: {
      flex: 1,
      fontSize: "1rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      wordBreak: "break-word",
    },
    deleteButton: {
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "0.5rem 0.75rem",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      opacity: 0.8,
    },
    emptyState: {
      padding: "3rem 1.5rem",
      textAlign: "center",
      opacity: 0.6,
      fontSize: "1rem",
    },
  };

  return (
    <div style={premiumStyles.container}>
      <div style={premiumStyles.overlay} />
      <div style={premiumStyles.wrapper}>
        <header style={premiumStyles.header}>
          <div style={premiumStyles.themeToggle}>
            <ThemeToggleButton
              config={{ themes, default: "light" }}
              icons={{ light: "☀️", dark: "🌙" }}
              labels={{ light: "Light", dark: "Dark" }}
            />
          </div>
          <div style={{ fontSize: isMobile ? "3rem" : "4rem", marginBottom: "0.5rem" }}>✨</div>
          <h1 style={premiumStyles.title}>TaskFlow Pro</h1>
          <p style={premiumStyles.subtitle}>Organize your life with style</p>
        </header>

        <div style={premiumStyles.addCard}>
          <div style={premiumStyles.inputContainer}>
            <div style={{ fontSize: "1.5rem" }}>📝</div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder={isMobile ? "Add a new task..." : "What amazing thing will you accomplish today?"}
              style={premiumStyles.input}
            />
            <button
              onClick={addTodo}
              style={premiumStyles.addButton}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.3)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.2)`;
              }}
            >
              ✨ Add Task
            </button>
          </div>
        </div>

        {/* Premium Stats Dashboard */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: isMobile ? "1rem" : "1.5rem",
          marginBottom: isMobile ? "1.5rem" : "2rem",
        }}>
          {[
            { icon: "📊", value: todos.length, label: "Total Tasks", color: "var(--primary)" },
            { icon: "⚡", value: activeCount, label: "Active", color: "#f59e0b" },
            { icon: "🎉", value: completedCount, label: "Completed", color: "#10b981" },
            { icon: "📈", value: `${completionRate}%`, label: "Progress", color: "#8b5cf6" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "var(--card-bg)",
                padding: isMobile ? "1rem" : "1.5rem",
                borderRadius: isMobile ? "12px" : "16px",
                textAlign: "center",
                border: `1px solid var(--border)`,
                boxShadow: `0 8px 20px rgba(0,0,0,0.1)`,
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.15)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.1)`;
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
              }} />
              <div style={{ fontSize: isMobile ? "1.8rem" : "2.5rem", marginBottom: "0.25rem" }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                fontWeight: "700",
                color: stat.color,
                marginBottom: "0.25rem",
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: isMobile ? "0.8rem" : "0.9rem", opacity: 0.7, fontWeight: "500" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          gap: isMobile ? "0.25rem" : "0.5rem",
          marginBottom: isMobile ? "1.5rem" : "2rem",
          justifyContent: "center",
          background: "var(--card-bg)",
          padding: "0.5rem",
          borderRadius: isMobile ? "12px" : "16px",
          border: `1px solid var(--border)`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 8px 20px rgba(0,0,0,0.1)`,
          flexWrap: "wrap",
        }}>
          {[
            { key: "all", label: "All Tasks", icon: "📋" },
            { key: "active", label: "Active", icon: "⚡" },
            { key: "completed", label: "Done", icon: "✅" },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              style={{
                padding: isMobile ? "0.5rem 1rem" : "0.75rem 1.5rem",
                border: "none",
                background: filter === filterOption.key ? "var(--primary)" : "transparent",
                color: filter === filterOption.key ? "white" : "var(--text)",
                borderRadius: isMobile ? "8px" : "12px",
                cursor: "pointer",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "0.25rem" : "0.5rem",
                boxShadow: filter === filterOption.key ? `0 4px 12px rgba(0,0,0,0.2)` : "none",
                flex: isMobile ? "1" : "none",
                justifyContent: "center",
              }}
            >
              <span>{filterOption.icon}</span>
              {filterOption.label}
            </button>
          ))}
        </div>

        <div style={premiumStyles.todoList}>
          {filteredTodos.length === 0 ? (
            <div style={premiumStyles.emptyState}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
                {todos.length === 0 ? "🎯" : filter === "active" ? "⚡" : filter === "completed" ? "🎉" : "📋"}
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                {todos.length === 0 
                  ? "Ready to conquer your day?" 
                  : filter === "active" 
                    ? "No active tasks!" 
                    : filter === "completed" 
                      ? "No completed tasks yet!" 
                      : "No tasks found!"}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {todos.length === 0 
                  ? "Add your first task above to get started!" 
                  : filter === "active" 
                    ? "All tasks are completed! 🎉" 
                    : filter === "completed" 
                      ? "Complete some tasks to see them here!" 
                      : "Try a different filter!"}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                style={{
                  ...premiumStyles.todoItem,
                  borderBottom: index < filteredTodos.length - 1 ? `1px solid var(--border)` : "none",
                  background: todo.completed ? "rgba(16,185,129,0.1)" : "transparent",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  if (!todo.completed) {
                    e.currentTarget.style.background = "rgba(59,130,246,0.05)";
                    e.currentTarget.style.transform = "translateX(8px)";
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = todo.completed ? "rgba(16,185,129,0.1)" : "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    border: `2px solid ${todo.completed ? "#10b981" : "var(--border)"}`,
                    marginRight: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: todo.completed ? "#10b981" : "transparent",
                    transition: "all 0.3s ease",
                    fontSize: "0.8rem",
                    color: "white",
                  }}
                >
                  {todo.completed && "✓"}
                </div>
                <span
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    ...premiumStyles.todoText,
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.6 : 1,
                    cursor: "pointer",
                  }}
                >
                  {todo.text}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {todo.completed && (
                    <span style={{ fontSize: "1.2rem", opacity: 0.7 }}>🎉</span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo.id);
                    }}
                    style={{
                      ...premiumStyles.deleteButton,
                      borderRadius: "50%",
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
                      e.currentTarget.style.background = "#dc2626";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                      e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                      e.currentTarget.style.background = "#ef4444";
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Premium Footer */}
        <div style={{
          textAlign: "center",
          marginTop: isMobile ? "2rem" : "3rem",
          padding: isMobile ? "1.5rem" : "2rem",
          background: "var(--card-bg)",
          borderRadius: isMobile ? "12px" : "16px",
          border: `1px solid var(--border)`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 8px 20px rgba(0,0,0,0.1)`,
        }}>
          <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>✨</div>
          <p style={{ margin: 0, opacity: 0.7, fontSize: "0.8rem" }}>
            Made with ❤️ • TaskFlow Pro v2.0 • Premium Edition
          </p>
        </div>
      </div>
    </div>
  );
}