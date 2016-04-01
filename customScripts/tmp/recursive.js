function GetNeededExperience(aLevel)
{
    //log.info(aLevel);
    if(aLevel <= 0)
    {
        return 50;
    }
    else{
        return aLevel*50 + GetNeededExperience(aLevel-1);
    }
}
log.info(request.user.id);
GetNeededExperience(request.params.level);