import * as React from 'react';
import { ILayoutProps } from '@/typings/layout';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
export default function ManagementLayout({ children }: ILayoutProps) {
    return (
        <div>
            <div>MANAGEMENT LAYOUT</div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );  
}