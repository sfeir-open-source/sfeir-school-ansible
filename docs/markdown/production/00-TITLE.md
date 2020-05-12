<!-- .slide: class="transition"-->  

# En production

##==##

<!-- .slide: class="with-code" -->

# En production
<br/>

## L'inventaire dynamique
Ansible ne fonctionne qu’avec un inventaire, il peut être :
* Statique, dans le cas de serveurs on-premise ou qui n’ont pas vocation à être “jetable” (pets)
* Dynamique, dans le cas de serveurs Cloud et “jetable” (cattle)

Dans le cas de l’inventaire dynamique, depuis la version 2.4, certains plugins permettent de se passer d’un inventaire et d’exécuter un playbook.

```yaml
[inventory]
enable_plugins = gcp_compute
```

Notes:
Ansible gère de manière différente les inventaires dynamique de Cloud Provider.
GCP est le seul provider a disposer d’un plugin fonctionnel parmi les 3 les plus demandés sur le marché.

##==##

<!-- .slide: -->

# En production
<br/>

## Déploiment continu
Parmi les outils de CICD, seul Jenkins dispose d’un plugin ansible permettant d’exécuter un playbook et de déchiffrer des secrets.
Si vous devez déployer sur plusieurs environnements, vous pouvez créer un fichier de variable par environnement qui seront “appelés” au moment de l’exécution du playbook.

Notes:
Peu importe l'outil de CICD sur lequel on est le plus familiarisé.
Jenkins semble être le seul à proposer un plugin pour Ansible gérant à la fois les commandes "ansible-playbook" et "ansible-vault".
Cependant, avec les autres outils de CICD, on peut démarrer les playbook de la même manière que via une ligne de commande classique.

##==##

<!-- .slide: -->

# En production
<br/>

## Les bastions
Ansible communique avec les machines de l'inventaire via SSH.  
En précisant, dans le fichier de configuration d'ansible quelle configuration ssh utiliser pour se connecter aux serveurs cibles, ansible l'utilisera pour les provisionner.

![h-400:center](./assets/images/bastion.png)

Notes:
Ainsi, le bastion conserve sa fonction de jump host.

##==##
<!-- .slide: class="with-code" -->

# En production
<br/>

## Les bastions
### Configuration d'ansible
<!-- .slide: class="with-code-bg-dark" .element: class="center" -->
```
[ssh_connection]
ssh_args = -F ssh.cfg
control_path = ~/.ssh/mux-%r@%h:%p
```
### Configuration SSH
```
Host bastion
 Hostname 84.39.41.33
 User admin
 IdentityFile /home/you/.ssh/your_key.pem

Host 192.168.47.*
 ProxyCommand ssh -F ssh.cfg -W %h:%p bastion
 User admin
```

Notes:
Cela fonctionne aussi bien pour les inventaires statiques et dynamiques.
