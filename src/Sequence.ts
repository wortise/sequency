import {applyMixins} from "./internal";
import {All as AllOp} from "./operators/sync/all";
import {Any as AnyOp} from "./operators/sync/any";
import {AsIterable as AsIterableOp} from "./operators/sync/asIterable";
import {Associate as AssociateOp} from "./operators/sync/associate";
import {AssociateBy as AssociateByOp} from "./operators/sync/associateBy";
import {Average as AverageOp} from "./operators/sync/average";
import {Chunk as ChunkOp} from "./operators/sync/chunk";
import {Contains as ContainsOp} from "./operators/sync/contains";
import {Count as CountOp} from "./operators/sync/count";
import {Distinct as DistinctOp} from "./operators/sync/distinct";
import {DistinctBy as DistinctByOp} from "./operators/sync/distinctBy";
import {Drop as DropOp} from "./operators/sync/drop";
import {DropWhile as DropWhileOp} from "./operators/sync/dropWhile";
import {ElementAt as ElementAtOp} from "./operators/sync/elementAt";
import {ElementAtOrElse as ElementAtOrElseOp} from "./operators/sync/elementAtOrElse";
import {ElementAtOrNull as ElementAtOrNullOp} from "./operators/sync/elementAtOrNull";
import {Filter as FilterOp} from "./operators/sync/filter";
import {FilterHolistically as FilterHolisticallyOp} from "./operators/sync/filterHolistically";
import {FilterIndexed as FilterIndexedOp} from "./operators/sync/filterIndexed";
import {FilterNot as FilterNotOp} from "./operators/sync/filterNot";
import {FilterNotNull as FilterNotNullOp} from "./operators/sync/filterNotNull";
import {First as FirstOp} from "./operators/sync/first";
import {FirstOrNull as FirstOrNullOp} from "./operators/sync/firstOrNull";
import {FlatMap as FlatMapOp} from "./operators/sync/flatMap";
import {Flatten as FlattenOp} from "./operators/sync/flatten";
import {Fold as FoldOp} from "./operators/sync/fold";
import {FoldIndexed as FoldIndexedOp} from "./operators/sync/foldIndexed";
import {ForEach as ForEachOp} from "./operators/sync/forEach";
import {ForEachIndexed as ForEachIndexedOp} from "./operators/sync/forEachIndexed";
import {GroupBy as GroupByOp} from "./operators/sync/groupBy";
import {IndexOf as IndexOfOp} from "./operators/sync/indexOf";
import {IndexOfFirst as IndexOfFirstOp} from "./operators/sync/indexOfFirst";
import {IndexOfLast as IndexOfLastOp} from "./operators/sync/indexOfLast";
import {JoinToString as JoinToStringOp} from "./operators/sync/joinToString";
import {Last as LastOp} from "./operators/sync/last";
import {LastOrNull as LastOrNullOp} from "./operators/sync/lastOrNull";
import {Map as MapOp} from "./operators/sync/map";
import {MapIndexed as MapIndexedOp} from "./operators/sync/mapIndexed";
import {MapNotNull as MapNotNullOp} from "./operators/sync/mapNotNull";
import {Max as MaxOp} from "./operators/sync/max";
import {MaxBy as MaxByOp} from "./operators/sync/maxBy";
import {MaxWith as MaxWithOp} from "./operators/sync/maxWith";
import {Merge as MergeOp} from "./operators/sync/merge";
import {Min as MinOp} from "./operators/sync/min";
import {MinBy as MinByOp} from "./operators/sync/minBy";
import {Minus as MinusOp} from "./operators/sync/minus";
import {MinWith as MinWithOp} from "./operators/sync/minWith";
import {None as NoneOp} from "./operators/sync/none";
import {OnEach as OnEachOp} from "./operators/sync/onEach";
import {Partition as PartitionOp} from "./operators/sync/partition";
import {Plus as PlusOp} from "./operators/sync/plus";
import {Reduce as ReduceOp} from "./operators/sync/reduce";
import {ReduceIndexed as ReduceIndexedOp} from "./operators/sync/reduceIndexed";
import {Reverse as ReverseOp} from "./operators/sync/reverse";
import {Single as SingleOp} from "./operators/sync/single";
import {SingleOrNull as SingleOrNullOp} from "./operators/sync/singleOrNull";
import {Sorted as SortedOp} from "./operators/sync/sorted";
import {SortedBy as SortedByOp} from "./operators/sync/sortedBy";
import {SortedByDescending as SortedByDescendingOp} from "./operators/sync/sortedByDescending";
import {SortedDescending as SortedDescendingOp} from "./operators/sync/sortedDescending";
import {SortedWith as SortedWithOp} from "./operators/sync/sortedWith";
import {Sum as SumOp} from "./operators/sync/sum";
import {SumBy as SumByOp} from "./operators/sync/sumBy";
import {Take as TakeOp} from "./operators/sync/take";
import {TakeWhile as TakeWhileOp} from "./operators/sync/takeWhile";
import {ToArray as ToArrayOp} from "./operators/sync/toArray";
import {ToMap as ToMapOp} from "./operators/sync/toMap";
import {ToSet as ToSetOp} from "./operators/sync/toSet";
import {Unzip as UnzipOp} from "./operators/sync/unzip";
import {WithIndex as WithIndexOp} from "./operators/sync/withIndex";
import {Zip as ZipOp} from "./operators/sync/zip";

/**
 * A Sequence provides a fluent functional API consisting
 * of various intermediate and terminal operations for processing the iterated data.
 * The operations are evaluated lazily to avoid examining all the input data
 * when it's not necessary. Sequences can be iterated only once.
 */
export interface Sequence<T> extends SequenceOperators<T> {
    readonly iterator: Iterator<T>;
}

/**
 * @hidden
 */
export interface SequenceOperators<T> extends AllOp, AnyOp, AsIterableOp, AssociateOp, AssociateByOp<T>, AverageOp, ChunkOp, ContainsOp, CountOp, DistinctOp, DistinctByOp, DropOp, DropWhileOp,
    ElementAtOp, ElementAtOrElseOp, ElementAtOrNullOp, FilterOp, FilterHolisticallyOp, FilterIndexedOp, FilterNotOp, FilterNotNullOp, FirstOp, FirstOrNullOp, FlatMapOp, FlattenOp, FoldOp,
    FoldIndexedOp, ForEachOp, ForEachIndexedOp, GroupByOp, IndexOfOp, IndexOfFirstOp, IndexOfLastOp, JoinToStringOp, LastOp, LastOrNullOp, MapOp, MapIndexedOp, MapNotNullOp, MaxOp, MaxByOp,
    MaxWithOp, MergeOp, MinOp, MinByOp, MinusOp, MinWithOp, NoneOp, OnEachOp, PartitionOp, PlusOp, ReduceOp, ReduceIndexedOp, ReverseOp, SingleOp, SingleOrNullOp, SortedOp, SortedByOp,
    SortedByDescendingOp, SortedDescendingOp, SortedWithOp, SumOp, SumByOp, TakeOp, TakeWhileOp, ToArrayOp, ToMapOp, ToSetOp, UnzipOp, WithIndexOp, ZipOp {
}

export class SequenceImpl<T> {
    constructor(readonly iterator: Iterator<T>) {
    }
}

applyMixins(SequenceImpl, [AllOp, AnyOp, AsIterableOp, AssociateOp, AssociateByOp, AverageOp, ChunkOp, ContainsOp, CountOp, DistinctOp, DistinctByOp, DropOp, DropWhileOp,
    ElementAtOp, ElementAtOrElseOp, ElementAtOrNullOp, FilterOp, FilterHolisticallyOp, FilterIndexedOp, FilterNotOp, FilterNotNullOp, FirstOp, FirstOrNullOp, FlatMapOp, FlattenOp, FoldOp,
    FoldIndexedOp, ForEachOp, ForEachIndexedOp, GroupByOp, IndexOfOp, IndexOfFirstOp, IndexOfLastOp, JoinToStringOp, LastOp, LastOrNullOp, MapOp, MapIndexedOp, MapNotNullOp, MaxOp, MaxByOp,
    MaxWithOp, MergeOp, MinOp, MinByOp, MinusOp, MinWithOp, NoneOp, OnEachOp, PartitionOp, PlusOp, ReduceOp, ReduceIndexedOp, ReverseOp, SingleOp, SingleOrNullOp, SortedOp, SortedByOp,
    SortedByDescendingOp, SortedDescendingOp, SortedWithOp, SumOp, SumByOp, TakeOp, TakeWhileOp, ToArrayOp, ToMapOp, ToSetOp, UnzipOp, WithIndexOp, ZipOp]);