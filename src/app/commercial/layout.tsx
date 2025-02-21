import * as React from 'react';
import { ILayoutProps } from '@/typings/layout';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function CommercialLayout({ children }: ILayoutProps) {
    return (
        <div>
            <div>COMMERCIAL LAYOUT</div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );  
}