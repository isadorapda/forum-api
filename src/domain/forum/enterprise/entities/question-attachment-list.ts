import { WatchedList } from '@/core/entities/watched-list'
import { QuestionAttchment } from './question-attachment'

export class QuestionAttachmentList extends WatchedList<QuestionAttchment> {
  compareItems(a: QuestionAttchment, b: QuestionAttchment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
