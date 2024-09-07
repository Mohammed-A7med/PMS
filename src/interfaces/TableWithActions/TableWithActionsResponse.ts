export interface TableWithActionsProps {
  tHead: React.ReactNode;
  setSearchParams: (params: any) => void;
  searchParams: URLSearchParams;
  ComponentName?: string;
  searchKey: string;
  list?: object[];
  handleDelete?: (id: number) => void | undefined;
  toggleActivation?: (id: number) => Promise<void>;
}
