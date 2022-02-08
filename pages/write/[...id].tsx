import { NextPage } from "next";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { WriteForm } from "../../components/WriteForm/intex";
const WritePage: NextPage = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm />
    </MainLayout>
  );
};

export const getServerSideProps = ctx => {
    
}

export default WritePage;
