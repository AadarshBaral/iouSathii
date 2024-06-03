import { cn } from '@/utils/cn';
import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';

interface IPageTitleProps {
  label: string;
  className?: string;
}
const PageTitle = ({ label, className, ...props }: IPageTitleProps) => {

  return (
    <View>
      <Typography style={{ fontFamily: "Poppins_500Medium" }} variant={'h3'} className={cn(`text-orange-600 text-5xl  pt-10 text-center`, className)} label={label} />
    </View>
  )
}

export default PageTitle