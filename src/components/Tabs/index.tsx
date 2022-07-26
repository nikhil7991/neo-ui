import React, { ReactNode, ReactElement, useState } from 'react';

type TabProps = {
  className?: string;
  children: ReactElement[];
  titleContainerClassName?: string;
  tabTitleActiveClassName?: string;
  tabTitleClassName?: string;
};

type TabTitleProps = {
  children: ReactNode;
  key: number;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  activeClassName?: string;
};

type TabContentProps = {
  children: ReactNode;
  key: number;
  className?: string;
};

const TabTitle = ({ children, key, onClick, active, activeClassName = '', className = '' }: TabTitleProps) => {
  return (
    <div
      className={`py-4 px-7 cursor-pointer font-medium font-dmSans shrink-0 text-sm text-center ${className} ${
        active ? `text-white border-b-2 border-danger ${activeClassName}` : 'text-white/[0.6]'
      }`}
      key={key}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const TabContent = ({ children, key, className = '' }: TabContentProps) => {
  return (
    <div key={key} className={className}>
      {children}
    </div>
  );
};

export const Tab = ({
  className = '',
  children,
  titleContainerClassName,
  tabTitleActiveClassName = '',
  tabTitleClassName = '',
}: TabProps) => {
  const [activeKey, setActiveKey] = useState<any>('1');
  const getNumberOfChildren = () => {
    let count = 0;
    React.Children.map(children, (child) => {
      if (child.type === TabTitle) {
        count++;
      }
    });
    return count;
  };

  const numberOfTabs = getNumberOfChildren();
  return (
    <div className={`${className}`}>
      <div
        className={`grid grid-cols-${numberOfTabs} justify-between border-b border-white/[0.2] overflow-y-auto md:overflow-y-auto md:overflow-x-clip ${titleContainerClassName}`}
      >
        {React.Children.map(children, (child) => {
          if (child.type === TabTitle) {
            return React.cloneElement(child, {
              onClick: () => {
                setActiveKey(child.key);
              },
              active: child.key === activeKey,
              activeClassName: tabTitleActiveClassName,
              // className: tabTitleClassName,
            });
          }
        })}
      </div>
      <div className="py-8">
        {React.Children.map(children, (child) => {
          if (child.type === TabContent && child.key === activeKey) {
            return React.cloneElement(child);
          }
        })}
      </div>
    </div>
  );
};

Tab.Title = TabTitle;
Tab.Content = TabContent;
export default Tab;
