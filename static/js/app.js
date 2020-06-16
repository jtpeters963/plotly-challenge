var graphid = 940;
function init(){
    d3.json("samples.json").then(function(data){
        samples= data.samples;
        var dropdown= d3.select("select");
        var options  = dropdown.selectAll("option").data(samples).enter()
        .append("option");
        options.text(function(d) {
            return d.id;
             });
        options.attr("value",function(d){
            return d.id
        })
        var sampleMeta = data.metadata.find(findid);
        var sampleData = data.samples.find(findid);
        d3.select("#meta-id").text(sampleMeta.id)
        d3.select("#meta-eth").text(sampleMeta.ethnicity)
        d3.select("#meta-gen").text(sampleMeta.gender)
        d3.select("#meta-age").text(sampleMeta.age)
        d3.select("#meta-loc").text(sampleMeta.location)
        d3.select("#meta-bb").text(sampleMeta.bbtype)
        d3.select("#meta-wfreq").text(sampleMeta.wfreq)
        var otuIds = sampleData.otu_ids.slice(0,10);
        var otuLabels = sampleData.otu_labels.slice(0,10);
        var barData=[{x:sampleData.sample_values.slice(0,10),
                    y:otuIds.map(otu =>`OTU ${otu}`),
                    type:"bar",
                    text:otuLabels,
                    orientation:"h"}]
        var barLayout = {title:"OTU Bar"}
        Plotly.newPlot("bar", barData,barLayout)
        var bubbleData = [{x:sampleData.otu_ids,
                            y:sampleData.sample_values,
                            mode:'markers',
                            text:sampleData.otu_labels,
                            marker:{
                                size:sampleData.sample_values,
                                color:sampleData.otu_ids,

                            }}];
        var bubbleLayout = {title:"Bubble Chart", showlegend:false, height:600, width:1200};
        Plotly.newPlot("bubble", bubbleData,bubbleLayout);
    })
}
function optionChanged(id){
    graphid=parseInt(id);
    d3.json("samples.json").then(function(data){
        var sampleMetaup = data.metadata.find(findid);
        var sampleDataup = data.samples.find(findid);
        var otuIdsup = sampleDataup.otu_ids.slice(0,10);
        d3.select("#meta-id").text(sampleMetaup.id)
        d3.select("#meta-eth").text(sampleMetaup.ethnicity)
        d3.select("#meta-gen").text(sampleMetaup.gender)
        d3.select("#meta-age").text(sampleMetaup.age)
        d3.select("#meta-loc").text(sampleMetaup.location)
        d3.select("#meta-bb").text(sampleMetaup.bbtype)
        d3.select("#meta-wfreq").text(sampleMetaup.wfreq)
        var y = otuIdsup.map(otu=>`OTU ${otu}`)
        var otuLabelsup = sampleDataup.otu_labels.slice(0,10);
        var x =sampleDataup.sample_values.slice(0,10);
        var markerup={size:sampleDataup.sample_values,
                        color:sampleDataup.otu_ids}
        Plotly.restyle("bar","x",[x]);
        Plotly.restyle("bar","y",[y]);
        Plotly.restyle("bar","text",[otuLabelsup]);
        Plotly.restyle("bubble","x",[sampleDataup.otu_ids]);
        Plotly.restyle("bubble","y",[sampleDataup.sample_values]);
        Plotly.restyle("bubble","text",[sampleDataup.otu_labels]);
        Plotly.restyle("bubble","marker",[markerup]);
    });
}

init();



function findid(samples){
    return parseInt(samples.id) === graphid;
}

