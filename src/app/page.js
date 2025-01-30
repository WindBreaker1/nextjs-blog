"use client";

import Link from "next/link";
import styles from "./page.module.css"

export default function Home() {

  return (
    <div className={styles.homePage}>
      <h2 className={styles.siteTag}>Quirky, fullstack, blog app.</h2>
      <hr></hr>
      <h2 className={styles.siteTag}>Features</h2>
      <hr></hr>
      <h2 className={styles.siteTag}>FAQ</h2>
      <hr></hr>
      <h2 className={styles.siteTag}>Call to Action</h2>
      <hr></hr>
    </div>
  );
}
