function firstFitDecreasing(items, binCapacity) {
    // Sort items in decreasing order
    items.sort((a, b) => b - a);
    
    let bins = [];
    
    for (let item of items) {
        let placed = false;
        for (let bin of bins) {
            let binTotal = bin.reduce((acc, val) => acc + val, 0);
            if (binTotal + item <= binCapacity) {
                bin.push(item);
                placed = true;
                break;
            }
        }
        if (!placed) {
            bins.push([item]);
        }
    }
    
    return bins;
}

function bestFitDecreasing(items, binCapacity) {
    // Sort items in decreasing order
    items.sort((a, b) => b - a);
    
    let bins = [];
    
    for (let item of items) {
        let bestBin = null;
        let minSpaceLeft = binCapacity + 1;
        
        for (let i = 0; i < bins.length; i++) {
            let binTotal = bins[i].reduce((acc, val) => acc + val, 0);
            let spaceLeft = binCapacity - (binTotal + item);
            if (spaceLeft >= 0 && spaceLeft < minSpaceLeft) {
                bestBin = i;
                minSpaceLeft = spaceLeft;
            }
        }
        
        if (bestBin !== null) {
            bins[bestBin].push(item);
        } else {
            bins.push([item]);
        }
    }
    
    return bins;
}

function compareAlgorithms(items, binCapacity) {
    let ffdBins = firstFitDecreasing([...items], binCapacity);
    let bfdBins = bestFitDecreasing([...items], binCapacity);
    
    console.log("First-Fit Decreasing (FFD):");
    console.log(`Number of bins used: ${ffdBins.length}`);
    console.log("Bins:", ffdBins);
    
    console.log("\nBest-Fit Decreasing (BFD):");
    console.log(`Number of bins used: ${bfdBins.length}`);
    console.log("Bins:", bfdBins);
}

// Example usage
const items = [2,2,3,3,3,3,4,4,4,6,7,7];
const binCapacity = 12;
compareAlgorithms(items, binCapacity);
