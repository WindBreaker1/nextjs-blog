"use client";

import { useState, useEffect } from "react";
import styles from "./searchBar.module.css"

const SearchBar = () => {
  return (
    <input className={styles.searchBar} placeholder="search..." />
  )
}

export default SearchBar