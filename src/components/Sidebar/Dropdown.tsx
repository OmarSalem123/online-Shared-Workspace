import React from 'react'

interface DropdownProps{
    title: string;
    id: string;
    listType: 'folder' | 'file';
    iconId: string;
    children?: React.ReactNode
    disabled: boolean;
    customIcon?: React.ReactNode;
}

const Dropdown:React.FC<DropdownProps> = ({ title, id, listType, iconId, children, disabled, customIcon, ...props}) => {
    //folder Title asynced with server data and local data

    //file title 

    //Navigate the user to different page 

    //add a file

    //double click handler

    //blur to save

    //onChanges

    //Move to trash
  return (
    <div>Dropdown</div>
  )
}

export default Dropdown