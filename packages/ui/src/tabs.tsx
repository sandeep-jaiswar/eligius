// Tabs.tsx

import React, { createContext, useContext, useState } from "react"
import { clsx } from "clsx"

type TabsContextType = {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

type TabsRootProps = {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

const Tabs = ({ children, value, onValueChange, className }: TabsRootProps) => {
  const [internalValue, setInternalValue] = useState("0")
  const activeTab = value ?? internalValue

  const setActiveTab = (val: string) => {
    onValueChange?.(val)
    if (value === undefined) {
      setInternalValue(val)
    }
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={clsx("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

// Tabs.List
const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    role="tablist"
    className={clsx("flex items-center space-x-2 border-b", className)}
  >
    {children}
  </div>
)

// Tabs.Trigger
const TabsTrigger = ({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within <Tabs>")

  const isActive = context.activeTab === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      className={clsx(
        "px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600 border-b-2 border-transparent",
        className
      )}
      onClick={() => context.setActiveTab(value)}
    >
      {children}
    </button>
  )
}

// Tabs.Content
const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within <Tabs>")

  if (context.activeTab !== value) return null

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={clsx("pt-4", className)}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs;
