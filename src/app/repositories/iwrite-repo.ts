export interface IWriteRepo<T> {
  create(item: T): Promise<any>;
  update(id: string, item: any): Promise<any>;
  delete(id: string): Promise<any>;
}
