"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ fontSize: "4rem", color: "red" }}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link href="/" style={{
        display: "inline-block",
        marginTop: "20px",
        padding: "12px 20px",
        background: "#0070f3",
        color: "#fff",
        borderRadius: "5px",
        textDecoration: "none"
      }}>
        Home Page
      </Link>
    </div>
  );
}
