'use client'
import { useAppState } from '@/lib/providers/state-provider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { Accordion, AccordionItem } from '../ui/accordion';
import clsx from 'clsx';
import { AccordionTrigger } from '@radix-ui/react-accordion';
import EmojiPicker from '../global/emoji-picker';
import { updateFolder } from '@/lib/supabase/queries';
import { useToast } from '../ui/use-toast';

interface DropdownProps{
    title: string;
    id: string;
    listType: 'folder' | 'file';
    iconId: string;
    children?: React.ReactNode
    disabled: boolean;
}

const Dropdown:React.FC<DropdownProps> = ({ title, id, listType, iconId, children, disabled, ...props}) => {
    const supabase = createClientComponentClient();
    const { state, dispatch, workspaceId, folderId } = useAppState();
    const [ isEditing, setIsEditing ] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    //folder Title asynced with server data and local data
    //file title 

    //Navigate the user to different page 
    const navigatPage = (accordianId: string, type: string) => {
        if(type === 'folder'){
            router.push(`/dashboard/${workspaceId}/${accordianId}`)
        }
        if(type === 'file'){
            router.push(`/dashboard/${workspaceId}/${folderId}/${accordianId}`)
        }
    }
    //add a file

    //double click handler

    //blur to save

    //onChanges
    const onChangeEmojiHandler = async (selectedEmoji: string) => {
        if(!workspaceId) return;
        if(listType === "folder"){
            dispatch({
                type: 'UPDATE_FOLDER',
                payload: {workspaceId, folderId: id, folder: { iconId: selectedEmoji}},
            });
            const { data, error } = await updateFolder({ iconId: selectedEmoji }, id);
            if(error){
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: "Could not update the emoji for this folder"
                });
            } else {
                toast({
                    title: "Success",
                    description: "Updated emoji for the folder"
                });
            }
        }
    };
    //Move to trash
    const isFolder = listType === 'folder';
    const groupIdentifies = clsx(
        'dark:text-white whitespace-nowrap flex justify-between items-center w-full relative',
        {
            'group/folder': isFolder, 
            'group/file': !isFolder,
        }
    );
    const listStyles = useMemo(() => clsx('relative', {
        'border-none text-md': isFolder,
        'border-none ml-6 text-[16px] py-1': !isFolder,
        }),
    [isFolder])
  return (
    <AccordionItem value={id} className={listStyles} onClick={(e) => {
        e.stopPropagation();
        navigatPage(id, listType)
    }}>
        <AccordionTrigger id={listType} className='hover:no-underline p-2 dark:text-muted-foreground text-sm' disabled={listType === 'file'}>
            <div className={groupIdentifies}>
                <div className='flex gap-4 items-center justify-center overflow-hidden'>
                    <div className='relative'>
                        <EmojiPicker getValue={onChangeEmojiHandler}>{iconId}</EmojiPicker>
                    </div>
                </div>
            </div>
        </AccordionTrigger>
    </AccordionItem>
  )
}

export default Dropdown