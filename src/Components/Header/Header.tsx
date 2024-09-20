"use client";
import Styles from "./Header.module.scss";
import logo from "./logo.png";
import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        <div>
          <Image src={logo} alt="Logo" width={150} height={36} />
        </div>
        <div className={Styles.center}>
          <h1>Bem-vindo de volta, Marcus</h1>
        </div>
        <div>
          <h2>Segunda, 01 de dezembro de 2025</h2>
        </div>
      </div>
    </header>
  );
};
