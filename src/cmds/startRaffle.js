module.exports = {
    name: 'raffle starter',
    description: 'starts the raffle',
    execute(msg, args, client, Discord){
        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Sorry")
            .setDescription("The Centum Group has a **strict 18+ plus policy**, Meaning we will have to deny your application. Also please **do not** try to change your age recruitment staff have already been notified. You may come back when you are the age of 18. Thanks for taking interest in The Centum Group. Have a great day!")
            .setFooter('Your application has been Denied')
        msg.author.send(embed)

    }
}