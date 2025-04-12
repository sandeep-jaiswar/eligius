import React, { useState } from "react";
import { clsx } from "clsx";

type TabProps = {
  /**
   * The label to display in the tab.
   */
  children: React.ReactNode;

  /**
   * Whether the tab is active or not.
   */
  isActive?: boolean;

  /**
   * A callback to handle tab selection.
   */
  onClick?: () => void;
};

const Tab = ({ children, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={clsx(
      "px-4 py-2 text-sm font-medium",
      {
        "text-blue-600 border-b-2 border-blue-600": isActive,
        "text-gray-600 hover:text-blue-600": !isActive,
      },
      "focus:outline-none"
    )}
  >
    {children}
  </button>
);

type TabsProps = {
  /**
   * The children will be a list of `Tab` components and corresponding `TabPanel` components.
   */
  children: React.ReactNode;
};

const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Extract the tabs and tab panels from the children
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Tab
  );
  const tabPanels = React.Children.toArray(children).filter(
    (child) => !React.isValidElement(child) || child.type !== Tab
  );
  return (
    <div>
      <div className="flex space-x-4">{tabs.map((tab, index) => (
        React.cloneElement(tab as React.ReactElement, {
          isActive: activeTab === index,
          onClick: () => setActiveTab(index),
        })
      ))}</div>
      <div>{tabPanels[activeTab]}</div>
    </div>
  );
};

export { Tabs, Tab };
