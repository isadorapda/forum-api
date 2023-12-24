import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  public compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('WatchedList', () => {
  it('should be able to create a new list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to add items to a list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)

    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from a list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(1)

    expect(list.currentItems).toHaveLength(2)

    expect(list.getRemovedItems()).toEqual([1])

    expect(list.getItems()).toEqual([2, 3])
  })

  it('should be able to add the same item to a list after being removed', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(1)

    list.add(1)

    expect(list.currentItems).toHaveLength(3)

    expect(list.getRemovedItems()).toEqual([])

    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to remove the same item to a list after being recently added', () => {
    const list = new NumberWatchedList([2, 3])

    list.add(1)

    list.remove(1)
    list.remove(2)

    expect(list.currentItems).toHaveLength(1)

    expect(list.getRemovedItems()).toEqual([2])

    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to update a list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([1, 3, 5])

    expect(list.currentItems).toHaveLength(3)

    expect(list.getRemovedItems()).toEqual([2])

    expect(list.getNewItems()).toEqual([5])
  })
})
