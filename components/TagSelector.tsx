"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { cn } from "@/app/_lib/utils";
import { supportedTags } from "@/components/Tags";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TagSelector({
  selectedTags,
  disabled,
  onTagSelected,
}: {
  selectedTags: string[];
  disabled: boolean;
  onTagSelected: (tag: string) => any;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop)
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            className="w-full justify-between border-[#aaaaa4e3] bg-transparent font-normal text-muted-foreground"
          >
            Add Tags...
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <TagSelectorList
            selectedTags={selectedTags}
            onSelect={onTagSelected}
          />
        </PopoverContent>
      </Popover>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          className="w-full justify-between border-[#aaaaa4e3] bg-transparent font-normal text-muted-foreground"
        >
          Add Tags...
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-[9999] border-t-0 bg-[#f6f6ef]">
        <DrawerDescription className="hidden">Add tags</DrawerDescription>
        <DrawerTitle className="hidden">Add tags</DrawerTitle>
        <div className="mt-2">
          <TagSelectorList
            className="border-0"
            selectedTags={selectedTags}
            onSelect={onTagSelected}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TagSelectorList({
  className,
  selectedTags,
  onSelect,
}: {
  className?: string;
  selectedTags: string[];
  onSelect: (tag: string) => any;
}) {
  return (
    <Command
      className={cn("border border-[#aaaaa4e3] bg-[#f6f6ef]", className)}
    >
      <CommandInput placeholder="Search tags..." className="h-9" />
      <CommandList>
        <CommandEmpty>No tag found.</CommandEmpty>
        <CommandGroup>
          {supportedTags.map((tag) => (
            <CommandItem key={tag} value={tag} onSelect={onSelect}>
              {tag}
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  selectedTags.includes(tag) ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const Tag = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <span
    className="inline-flex items-center rounded bg-[#99999a] px-2.5 py-0.5 text-xs font-medium text-white"
    onClick={onClick}
  >
    {children}
    <button
      type="button"
      className="ms-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-white"
      data-dismiss-target="#badge-dismiss-default"
      aria-label="Remove"
    >
      <svg
        className="h-2 w-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </span>
);
TagSelector.Tag = Tag;
