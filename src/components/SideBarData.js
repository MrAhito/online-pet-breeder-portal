import React from 'react'
import * as ioIcons from 'react-icons/io'
import * as aiIcons from 'react-icons/ai'
import * as bsIcons from 'react-icons/bs'

export const SideBarData = [
    {
        title: 'Home',
        path: '/admin',
        icon: <aiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Post',
        path: '/admin/post',
        icon: <bsIcons.BsFilePost />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/admin/messages',
        icon: <aiIcons.AiFillMessage />,
        cName: 'nav-text'
    },
    {
        title: 'Team',
        path: '/admin/team',
        icon: <ioIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: '/admin/reports',
        icon: <ioIcons.IoIosPaper />,
        cName: 'nav-text'
    }
]