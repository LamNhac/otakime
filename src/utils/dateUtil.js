const convertToDateType = (dateString)=>{
    var parts = dateString.split(/[\s/:]+/);
    var myDate = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]);

    return myDate
}
const dateUtil = {
    convertToDateType : convertToDateType
}
export default dateUtil