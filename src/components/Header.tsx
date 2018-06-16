import React from 'react'; 
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { links } from './nav';
 

export class Header extends React.Component 
{

  static get Links(){
     return [
         {title:"Schedule Editor",link:'edit'},
         {title:"Style Codes",link:'style-codes'},
         {title:"Line View", link:'paint-line'},
         {title:'Paint App',link:'paint-app'},
         {title:'Excel Import',link:'excel-import'},
         {title:'Driver Performance',link:'driver-performance'}
     ]
      
  }
 
    render(){
        
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"> Components</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                {
                    links.map(item=><NavItem key={item.title} href={item.link}>{item.title}</NavItem>)
                }
             </Nav>
             </Navbar>
        );
    }
}