import React from 'react';
import Table from './table';
import { CheckAuth } from '../tech/checking';

const Template_table = () => {
    CheckAuth(sessionStorage.getItem('auth'));
    return (
        <div>
            <Table />
        </div>
    );
};

export default Template_table;