import { appFoldersType, appWorkspacesType } from '@/lib/providers/state-provider';
import { File, Folder, workspace } from '@/lib/supabase/supabase.type';
import React from 'react'
import CustomDialogTrigger from '../global/CustomDialogTrigger';
import BannerUploadForm from './banner-upload-form';

interface BannerUploadProps {
    children: React.ReactNode;
    className?: string;
    dirType: "workspace" | "folder" | "file";
    id: string;
    details: appWorkspacesType | appFoldersType | File | workspace | Folder;
}

const BannerUpload:React.FC<BannerUploadProps> = ({children, className, dirType, id, details}) => {
  return (
    <CustomDialogTrigger header='Upload Banner' content={<BannerUploadForm details={details} dirType={dirType} id={id}></BannerUploadForm>} className={className}>
        {children}
    </CustomDialogTrigger>
  );
};

export default BannerUpload