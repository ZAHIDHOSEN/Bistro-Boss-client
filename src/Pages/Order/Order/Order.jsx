import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import oderCover from '../../../assets/shop/order.jpg'

import Cover from '../../Shared/Cover/Cover';
import useMenu from '../../../Hooks/useMenu';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {

    const categories = ['salad', 'pizza','soup', 'dessert', 'drinks' ]
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
   

    const [tabIndex, setTabIndex] = useState(initialIndex)
    
    const [menu] =useMenu();
   

    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')


    return (
        <div>
               <Helmet>
                 <title>Bistro Boss | Order</title>
                </Helmet>
            <Cover img={oderCover} title="ORDER FOOD"></Cover>

            
            <Tabs defaultIndex={tabIndex} onSelect={(index) => console.log(index)}>
      <TabList>
       <Tab>Salad</Tab>
       <Tab>Pizza</Tab>
       <Tab>soup</Tab>
       <Tab>Desert</Tab>
       <Tab>Drinks</Tab>
       
     </TabList>
     <TabPanel>
       <OrderTab items={salad}></OrderTab>
     </TabPanel>
     <TabPanel>
       <OrderTab items={pizza}></OrderTab>
     </TabPanel>
     <TabPanel>
       <OrderTab items={soup}></OrderTab>
     </TabPanel>
     <TabPanel>
       <OrderTab items={desserts}></OrderTab>
     </TabPanel>
     <TabPanel>
       <OrderTab items={drinks}></OrderTab>
     </TabPanel>
    
    </Tabs>
            

  
        </div>
    );
};

export default Order;