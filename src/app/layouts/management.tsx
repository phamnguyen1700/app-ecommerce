import * as React from 'react';
import { ILayoutProps } from '@/typings/layout';
import Header from './components/header';
import Footer from './components/footer';
export function CommercialLayout({ children }: ILayoutProps) {
    return (
        <div>
            <div>MANAGEMENT LAYOUT</div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );  
}