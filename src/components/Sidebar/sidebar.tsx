// 'use server'
import { getCollaboratingWorkspaces, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import WorkspaceDropdown from './workspace-dropdown';
import PlanUsage from './plan-usage';
import NativeNavigation from './native-navigation';
import { ScrollArea } from '../ui/scroll-area';
import FoldersDropdownList from './FoldersDropdownList';
import UserCard from './user-card';

interface SidebarProps{
    params: { workspaceId: string };
    className?: string;
}

const Sidebar:React.FC<SidebarProps> = async({ params, className }) => {
    const supabase = createServerComponentClient({ cookies });
    //user
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if(!user) return;
    //Subscription
    const { data: subscriptionData, error: subscriptionError } = await getUserSubscriptionStatus(user.id);
    //folders
    const { data: workspaceFolderData, error: foldersError } = await getFolders(params.workspaceId)
    //error
    if(subscriptionError || foldersError) redirect('/dashboard');
    const [privateWorkspaces, collaboratedWorkspaces, sharedWorkspaces] = await Promise.all([
        getPrivateWorkspaces(user.id), 
        getCollaboratingWorkspaces(user.id), 
        getSharedWorkspaces(user.id) 
    ]);
    //get all the different workspaces private collaborating shared
  return (
    <aside className={twMerge(
        'hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',
        className
      )}>
        <div>
            <WorkspaceDropdown privateWorkspaces={privateWorkspaces} collaboratingWorkspaces={collaboratedWorkspaces} sharedWorkspaces={sharedWorkspaces} defaultValue={[ ...privateWorkspaces, ...collaboratedWorkspaces, ...sharedWorkspaces].find(workspace=> workspace.id === params.workspaceId)} />
            <PlanUsage foldersLength={workspaceFolderData?.length || 0} subscription={subscriptionData} />
            <NativeNavigation myWorkspaceId={params.workspaceId} />
            <ScrollArea className='overflow-auto relative h-[450px]'>
              <div className='pinter-events-none w-full absolute h-20 bg-gradient-to-t from-background to-transparent z-40'>
                <FoldersDropdownList workspaceFolders={workspaceFolderData || []} workspaceId={params.workspaceId} />
              </div>
            </ScrollArea>
        </div>
        <UserCard subscription={subscriptionData} />
    </aside>
  )
}

export default Sidebar