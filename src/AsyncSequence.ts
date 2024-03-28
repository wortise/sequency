import {applyMixins} from "./internal";
import {All as AllOp} from "./operators/async/all";
import {Any as AnyOp} from "./operators/async/any";
import {AsIterable as AsIterableOp} from "./operators/async/asIterable";
import {Associate as AssociateOp} from "./operators/async/associate";
import {AssociateBy as AssociateByOp} from "./operators/async/associateBy";
import {Average as AverageOp} from "./operators/async/average";
import {Chunk as ChunkOp} from "./operators/async/chunk";
import {Contains as ContainsOp} from "./operators/async/contains";
import {Count as CountOp} from "./operators/async/count";
import {Distinct as DistinctOp} from "./operators/async/distinct";
import {DistinctBy as DistinctByOp} from "./operators/async/distinctBy";
import {Drop as DropOp} from "./operators/async/drop";
import {DropWhile as DropWhileOp} from "./operators/async/dropWhile";
import {ElementAt as ElementAtOp} from "./operators/async/elementAt";
import {ElementAtOrElse as ElementAtOrElseOp} from "./operators/async/elementAtOrElse";
import {ElementAtOrNull as ElementAtOrNullOp} from "./operators/async/elementAtOrNull";
import {Filter as FilterOp} from "./operators/async/filter";
import {FilterHolistically as FilterHolisticallyOp} from "./operators/async/filterHolistically";
import {FilterIndexed as FilterIndexedOp} from "./operators/async/filterIndexed";
import {FilterNot as FilterNotOp} from "./operators/async/filterNot";
import {FilterNotNull as FilterNotNullOp} from "./operators/async/filterNotNull";
import {First as FirstOp} from "./operators/async/first";
import {FirstOrNull as FirstOrNullOp} from "./operators/async/firstOrNull";
import {FlatMap as FlatMapOp} from "./operators/async/flatMap";
import {Flatten as FlattenOp} from "./operators/async/flatten";
import {Fold as FoldOp} from "./operators/async/fold";
import {FoldIndexed as FoldIndexedOp} from "./operators/async/foldIndexed";
import {ForEach as ForEachOp} from "./operators/async/forEach";
import {ForEachIndexed as ForEachIndexedOp} from "./operators/async/forEachIndexed";
import {GroupBy as GroupByOp} from "./operators/async/groupBy";
import {IndexOf as IndexOfOp} from "./operators/async/indexOf";
import {IndexOfFirst as IndexOfFirstOp} from "./operators/async/indexOfFirst";
import {IndexOfLast as IndexOfLastOp} from "./operators/async/indexOfLast";
import {JoinToString as JoinToStringOp} from "./operators/async/joinToString";
import {Last as LastOp} from "./operators/async/last";
import {LastOrNull as LastOrNullOp} from "./operators/async/lastOrNull";
import {Map as MapOp} from "./operators/async/map";
import {MapIndexed as MapIndexedOp} from "./operators/async/mapIndexed";
import {MapNotNull as MapNotNullOp} from "./operators/async/mapNotNull";
import {Max as MaxOp} from "./operators/async/max";
import {MaxBy as MaxByOp} from "./operators/async/maxBy";
import {MaxWith as MaxWithOp} from "./operators/async/maxWith";
import {Merge as MergeOp} from "./operators/async/merge";
import {Min as MinOp} from "./operators/async/min";
import {MinBy as MinByOp} from "./operators/async/minBy";
import {Minus as MinusOp} from "./operators/async/minus";
import {MinWith as MinWithOp} from "./operators/async/minWith";
import {None as NoneOp} from "./operators/async/none";
import {OnEach as OnEachOp} from "./operators/async/onEach";
import {Partition as PartitionOp} from "./operators/async/partition";
import {Plus as PlusOp} from "./operators/async/plus";
import {Reduce as ReduceOp} from "./operators/async/reduce";
import {ReduceIndexed as ReduceIndexedOp} from "./operators/async/reduceIndexed";
import {Reverse as ReverseOp} from "./operators/async/reverse";
import {Single as SingleOp} from "./operators/async/single";
import {SingleOrNull as SingleOrNullOp} from "./operators/async/singleOrNull";
import {Sorted as SortedOp} from "./operators/async/sorted";
import {SortedBy as SortedByOp} from "./operators/async/sortedBy";
import {SortedByDescending as SortedByDescendingOp} from "./operators/async/sortedByDescending";
import {SortedDescending as SortedDescendingOp} from "./operators/async/sortedDescending";
import {SortedWith as SortedWithOp} from "./operators/async/sortedWith";
import {Sum as SumOp} from "./operators/async/sum";
import {SumBy as SumByOp} from "./operators/async/sumBy";
import {Take as TakeOp} from "./operators/async/take";
import {TakeWhile as TakeWhileOp} from "./operators/async/takeWhile";
import {ToArray as ToArrayOp} from "./operators/async/toArray";
import {ToMap as ToMapOp} from "./operators/async/toMap";
import {ToSet as ToSetOp} from "./operators/async/toSet";
import {Unzip as UnzipOp} from "./operators/async/unzip";
import {WithIndex as WithIndexOp} from "./operators/async/withIndex";
import {Zip as ZipOp} from "./operators/async/zip";

/**
 * A Sequence provides a fluent functional API consisting
 * of various intermediate and terminal operations for processing the iterated data.
 * The operations are evaluated lazily to avoid examining all the input data
 * when it's not necessary. Sequences can be iterated only once.
 */
export interface AsyncSequence<T> extends AsyncSequenceOperators<T> {
    readonly iterator: AsyncIterator<T>;
}

/**
 * @hidden
 */
export interface AsyncSequenceOperators<T> extends AllOp, AnyOp, AsIterableOp, AssociateOp, AssociateByOp<T>, AverageOp, ChunkOp, ContainsOp, CountOp, DistinctOp, DistinctByOp, DropOp, DropWhileOp,
    ElementAtOp, ElementAtOrElseOp, ElementAtOrNullOp, FilterOp, FilterHolisticallyOp, FilterIndexedOp, FilterNotOp, FilterNotNullOp, FirstOp, FirstOrNullOp, FlatMapOp, FlattenOp, FoldOp,
    FoldIndexedOp, ForEachOp, ForEachIndexedOp, GroupByOp, IndexOfOp, IndexOfFirstOp, IndexOfLastOp, JoinToStringOp, LastOp, LastOrNullOp, MapOp, MapIndexedOp, MapNotNullOp, MaxOp, MaxByOp,
    MaxWithOp, MergeOp, MinOp, MinByOp, MinusOp, MinWithOp, NoneOp, OnEachOp, PartitionOp, PlusOp, ReduceOp, ReduceIndexedOp, ReverseOp, SingleOp, SingleOrNullOp, SortedOp, SortedByOp,
    SortedByDescendingOp, SortedDescendingOp, SortedWithOp, SumOp, SumByOp, TakeOp, TakeWhileOp, ToArrayOp, ToMapOp, ToSetOp, UnzipOp, WithIndexOp, ZipOp {
}

export class AsyncSequenceImpl<T> {
    constructor(readonly iterator: AsyncIterator<T>) {
    }
}

applyMixins(AsyncSequenceImpl, [AllOp, AnyOp, AsIterableOp, AssociateOp, AssociateByOp, AverageOp, ChunkOp, ContainsOp, CountOp, DistinctOp, DistinctByOp, DropOp, DropWhileOp,
    ElementAtOp, ElementAtOrElseOp, ElementAtOrNullOp, FilterOp, FilterHolisticallyOp, FilterIndexedOp, FilterNotOp, FilterNotNullOp, FirstOp, FirstOrNullOp, FlatMapOp, FlattenOp, FoldOp,
    FoldIndexedOp, ForEachOp, ForEachIndexedOp, GroupByOp, IndexOfOp, IndexOfFirstOp, IndexOfLastOp, JoinToStringOp, LastOp, LastOrNullOp, MapOp, MapIndexedOp, MapNotNullOp, MaxOp, MaxByOp,
    MaxWithOp, MergeOp, MinOp, MinByOp, MinusOp, MinWithOp, NoneOp, OnEachOp, PartitionOp, PlusOp, ReduceOp, ReduceIndexedOp, ReverseOp, SingleOp, SingleOrNullOp, SortedOp, SortedByOp,
    SortedByDescendingOp, SortedDescendingOp, SortedWithOp, SumOp, SumByOp, TakeOp, TakeWhileOp, ToArrayOp, ToMapOp, ToSetOp, UnzipOp, WithIndexOp, ZipOp]);